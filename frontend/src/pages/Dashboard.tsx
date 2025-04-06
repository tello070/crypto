import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { NewInvestmentDialog } from "@/components/NewInvestmentDialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  ArrowUpRight, 
  Wallet, 
  CreditCard, 
  LineChart, 
  History, 
  ArrowRight,
  Loader2
} from "lucide-react";

export function Dashboard() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalCBC, setTotalCBC] = useState(0);

  // Fetch user investments
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        if (!currentUser) return;

        const { data, error } = await supabase
          .from('investments')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setInvestments(data || []);
        
        // Calculate totals
        if (data) {
          const invested = data.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
          const cbc = data.reduce((sum, inv) => sum + parseFloat(inv.cbc_amount), 0);
          setTotalInvested(invested);
          setTotalCBC(cbc);
        }
      } catch (error) {
        console.error("Error fetching investments:", error);
        toast({
          title: "Error",
          description: "Failed to load your investments",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, [currentUser, toast]);

  // Mock chart data
  const chartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
    { name: "Aug", value: 4000 },
    { name: "Sep", value: 5000 },
    { name: "Oct", value: 6000 },
    { name: "Nov", value: 7000 },
    { name: "Dec", value: totalCBC || 8000 },
  ];

  // Mock transaction history
  const transactionHistory = [
    { id: 1, type: "Deposit", amount: 1000, date: "2023-11-15", status: "completed" },
    { id: 2, type: "Withdrawal", amount: 500, date: "2023-11-10", status: "completed" },
    { id: 3, type: "Deposit", amount: 2000, date: "2023-11-05", status: "completed" },
    { id: 4, type: "Withdrawal", amount: 300, date: "2023-10-28", status: "pending" },
  ];

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/50">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/50">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/50">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {currentUser?.email}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <NewInvestmentDialog />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Invested</CardTitle>
                <CardDescription>Your total investment amount</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">CBC Balance</CardTitle>
                <CardDescription>Your current CBC tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{totalCBC.toLocaleString()} CBC</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+8.2% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">CBC Value</CardTitle>
                <CardDescription>Current value of your CBC</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${(totalCBC * 0.5).toLocaleString()}</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+15.3% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>CBC Growth</CardTitle>
                <CardDescription>Your CBC token growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "Deposit" 
                            ? "bg-green-500/10" 
                            : "bg-red-500/10"
                        }`}>
                          <History className={`h-4 w-4 ${
                            transaction.type === "Deposit" 
                              ? "text-green-500" 
                              : "text-red-500"
                          }`} />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{transaction.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          transaction.type === "Deposit" 
                            ? "text-green-500" 
                            : "text-red-500"
                        }`}>
                          {transaction.type === "Deposit" ? "+" : "-"}
                          ${transaction.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getStatusBadge(transaction.status)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View All Transactions
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Your Investments</CardTitle>
                <CardDescription>Track all your investment requests</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : investments.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead>CBC Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investments.map((investment) => (
                        <TableRow key={investment.id}>
                          <TableCell>
                            {new Date(investment.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${parseFloat(investment.amount).toLocaleString()}</TableCell>
                          <TableCell>
                            {investment.coin} ({parseFloat(investment.coin_amount).toFixed(6)})
                          </TableCell>
                          <TableCell>{parseFloat(investment.cbc_amount).toLocaleString()} CBC</TableCell>
                          <TableCell>{getStatusBadge(investment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't made any investments yet.</p>
                    <NewInvestmentDialog />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}