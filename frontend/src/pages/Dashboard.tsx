import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { NewInvestmentDialog } from "@/components/NewInvestmentDialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Wallet, 
  CreditCard, 
  DollarSign, 
  BarChart3, 
  Clock, 
  ArrowRight,
  ChevronRight,
  Users,
  Bell,
  Settings,
  HelpCircle,
  Download
} from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showInvestmentDialog, setShowInvestmentDialog] = useState(false);

  // Mock data for the dashboard
  const portfolioData = [
    { name: "Bitcoin", symbol: "BTC", amount: 0.42, value: 27481.48, change: 2.4, color: "#F7931A" },
    { name: "Ethereum", symbol: "ETH", amount: 3.5, value: 12325.08, change: -1.2, color: "#627EEA" },
    { name: "Solana", symbol: "SOL", amount: 48.2, value: 6886.06, change: 5.7, color: "#00FFA3" },
    { name: "CryptoBet", symbol: "CBT", amount: 25000, value: 25000.00, change: 0, color: "#4ADE80" }
  ];

  const investmentData = [
    { name: "Angel Investor", amount: 25000, returns: 1250, status: "active", date: "2023-09-15" },
    { name: "Staking Rewards", amount: 5000, returns: 400, status: "active", date: "2023-10-01" },
    { name: "Referral Bonus", amount: 1000, returns: 0, status: "pending", date: "2023-11-05" }
  ];

  const [investments, setInvestments] = useState(investmentData);

  const handleNewInvestment = (investment: any) => {
    setInvestments(prev => [investment, ...prev]);
  };

  // Rest of the existing code remains exactly the same...
  // Include all the other mock data, helper functions, and JSX

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Keep all existing JSX exactly the same, just update the investments section */}
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Keep existing tabs and content */}
            
            {/* Update only the investments tab content */}
            <TabsContent value="investments" className="space-y-6">
              <Card>
                <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base md:text-lg">Your Investments</CardTitle>
                      <CardDescription className="text-xs md:text-sm">Manage your active investments and returns</CardDescription>
                    </div>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm"
                      onClick={() => setShowInvestmentDialog(true)}
                    >
                      New Investment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4 md:pb-6 overflow-x-auto">
                  <div className="rounded-md border min-w-[600px]">
                    <div className="grid grid-cols-5 p-3 md:p-4 bg-muted/50 text-xs md:text-sm font-medium">
                      <div>Investment</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Returns</div>
                      <div className="text-center">Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {investments.map((investment, index) => (
                      <div key={index} className="grid grid-cols-5 p-3 md:p-4 border-t items-center">
                        <div>
                          <div className="font-medium text-xs md:text-sm">{investment.name}</div>
                          <div className="text-xs text-muted-foreground">{investment.date}</div>
                        </div>
                        <div className="text-right font-medium text-xs md:text-sm">
                          {formatCurrency(investment.amount)}
                          {investment.coin && <span className="text-xs text-muted-foreground ml-1">({investment.coin})</span>}
                        </div>
                        <div className="text-right text-green-500 font-medium text-xs md:text-sm">
                          +{formatCurrency(investment.returns)}
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className={`text-xs ${getStatusColor(investment.status)}`}>
                            {investment.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-xs md:text-sm">View Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs md:text-sm">Reinvest Returns</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs md:text-sm">Withdraw Returns</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Keep rest of the existing tabs content */}
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* New Investment Dialog */}
      <NewInvestmentDialog 
        open={showInvestmentDialog} 
        onOpenChange={setShowInvestmentDialog}
        onInvestmentComplete={handleNewInvestment}
      />
    </div>
  );
}