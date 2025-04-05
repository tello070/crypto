import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewInvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvestmentComplete: (investment: any) => void;
}

export function NewInvestmentDialog({ 
  open, 
  onOpenChange,
  onInvestmentComplete
}: NewInvestmentDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [cbcAmount, setCbcAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // CBC token price in USD
  const CBC_PRICE = 0.50;
  
  // Available coins for deposit
  const availableCoins = [
    { id: "btc", name: "Bitcoin", symbol: "BTC", price: 65432.10, color: "#F7931A", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
    { id: "eth", name: "Ethereum", symbol: "ETH", price: 3521.45, color: "#627EEA", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
    { id: "sol", name: "Solana", symbol: "SOL", price: 142.87, color: "#00FFA3", address: "8ZUczUAUSLWdpJEBGnvWC5UNPcUUiGXNJMbM9zKCabKs" },
    { id: "usdt", name: "Tether", symbol: "USDT", price: 1.00, color: "#26A17B", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
    { id: "usdc", name: "USD Coin", symbol: "USDC", price: 1.00, color: "#2775CA", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" }
  ];
  
  // Get selected coin data
  const selectedCoinData = availableCoins.find(coin => coin.id === selectedCoin);
  
  // Calculate CBC amount based on USD amount
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      setCbcAmount(parseFloat(amount) / CBC_PRICE);
    } else {
      setCbcAmount(0);
    }
  }, [amount]);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedCoin("");
      setAmount("");
      setCbcAmount(0);
      setTransactionHash("");
      setIsSubmitting(false);
    }
  }, [open]);
  
  // Handle amount change with validation
  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    if (selectedCoinData) {
      navigator.clipboard.writeText(selectedCoinData.address);
      toast({
        title: "Address copied",
        description: "Deposit address copied to clipboard",
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!transactionHash) {
      toast({
        title: "Transaction hash required",
        description: "Please enter the transaction hash to confirm your deposit",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newInvestment = {
        id: `INV${Math.floor(Math.random() * 1000000)}`,
        name: "CBC Token Purchase",
        amount: parseFloat(amount),
        coin: selectedCoinData?.symbol,
        cbcAmount: cbcAmount,
        returns: 0,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
        transactionHash
      };
      
      onInvestmentComplete(newInvestment);
      setIsSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: "Investment submitted",
        description: "Your investment is now pending confirmation",
      });
    }, 2000);
  };
  
  // Calculate coin amount based on USD
  const getCoinAmount = () => {
    if (!selectedCoinData || !amount || isNaN(parseFloat(amount))) return 0;
    return parseFloat(amount) / selectedCoinData.price;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">New Investment</DialogTitle>
              <DialogDescription>
                Select a cryptocurrency and amount to invest in CBC tokens
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="coin">Select Cryptocurrency</Label>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger id="coin" className="w-full">
                    <SelectValue placeholder="Select a coin" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCoins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: coin.color }}></div>
                          <span>{coin.name} ({coin.symbol})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum investment: $25</p>
              </div>
              
              {selectedCoin && amount && parseFloat(amount) > 0 && (
                <Card className="bg-muted/30 border-primary/20">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">You'll receive:</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{cbcAmount.toLocaleString()} CBC</div>
                        <div className="text-xs text-muted-foreground">@ $0.50 per CBC</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">You'll send:</span>
                      <div className="text-right">
                        <div className="font-bold">{getCoinAmount().toFixed(8)} {selectedCoinData?.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          ${parseFloat(amount).toLocaleString()} @ ${selectedCoinData?.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="sm:w-auto w-full"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setStep(2)}
                disabled={!selectedCoin || !amount || parseFloat(amount) < 25}
                className="bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto w-full"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === 2 && selectedCoinData && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Confirm Deposit</DialogTitle>
              <DialogDescription>
                Send {getCoinAmount().toFixed(8)} {selectedCoinData.symbol} to the address below
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Deposit Address</Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={selectedCoinData.address}
                      readOnly
                      className="pr-10 font-mono text-xs sm:text-sm bg-muted/50"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={copyAddressToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Only send {selectedCoinData.symbol} to this address
                </p>
              </div>
              
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 flex gap-2">
                <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-500">Important</p>
                  <p className="text-muted-foreground">
                    After sending the funds, enter the transaction hash below to confirm your deposit.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hash">Transaction Hash</Label>
                <Input
                  id="hash"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="0x..."
                  className="font-mono"
                />
              </div>
              
              <Card className="bg-muted/30 border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">You're sending:</span>
                    <div className="text-right">
                      <div className="font-bold">{getCoinAmount().toFixed(8)} {selectedCoinData.symbol}</div>
                      <div className="text-xs text-muted-foreground">${parseFloat(amount).toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">You'll receive:</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">{cbcAmount.toLocaleString()} CBC</div>
                      <div className="text-xs text-muted-foreground">@ $0.50 per CBC</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="sm:w-auto w-full"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!transactionHash || isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "I've Made the Investment"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}