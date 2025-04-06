import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function NewInvestmentDialog() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("BTC");
  const [loading, setLoading] = useState(false);

  // Calculate CBC amount based on investment amount (1 USD = 2 CBC)
  const cbcAmount = parseFloat(amount) * 2 || 0;

  // Calculate coin amount based on current rates
  const getCoinAmount = () => {
    // Mock exchange rates (in a real app, these would come from an API)
    const rates = {
      BTC: 65000, // 1 BTC = $65,000
      ETH: 2500,  // 1 ETH = $2,500
      SOL: 150,   // 1 SOL = $150
      USDT: 1,    // 1 USDT = $1
    };
    
    const usdAmount = parseFloat(amount) || 0;
    return usdAmount / rates[coin];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('investments')
        .insert([
          {
            user_id: currentUser?.id,
            amount: parseFloat(amount),
            coin: coin,
            coin_amount: getCoinAmount(),
            cbc_amount: cbcAmount,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investment created successfully"
      });
      
      setOpen(false);
      setAmount("");
      setCoin("BTC");
    } catch (error: any) {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to create investment. Please try again."
      });
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300">
          New Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Investment</DialogTitle>
          <DialogDescription>
            Enter the details of your new investment. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                min="100"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="Enter amount in USD"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coin" className="text-right">
                Coin
              </Label>
              <Select value={coin} onValueChange={setCoin}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select coin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">You Get</Label>
              <div className="col-span-3 flex items-center gap-2">
                <div className="font-medium">{cbcAmount.toLocaleString()} CBC</div>
                <div className="text-sm text-muted-foreground">
                  ({getCoinAmount().toFixed(6)} {coin})
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Investment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}