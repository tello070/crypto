import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
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
  
  // Mock data for the dashboard
  const portfolioData = [
    { name: "Bitcoin", symbol: "BTC", amount: 0.42, value: 27481.48, change: 2.4, color: "#F7931A" },
    { name: "Ethereum", symbol: "ETH", amount: 3.5, value: 12325.08, change: -1.2, color: "#627EEA" },
    { name: "Solana", symbol: "SOL", amount: 48.2, value: 6886.06, change: 5.7, color: "#00FFA3" },
    { name: "CryptoBet", symbol: "CBT", amount: 25000, value: 25000.00, change: 0, color: "#4ADE80" }
  ];
  
  const totalPortfolioValue = portfolioData.reduce((sum, coin) => sum + coin.value, 0);
  
  const investmentData = [
    { name: "Angel Investor", amount: 25000, returns: 1250, status: "active", date: "2023-09-15" },
    { name: "Staking Rewards", amount: 5000, returns: 400, status: "active", date: "2023-10-01" },
    { name: "Referral Bonus", amount: 1000, returns: 0, status: "pending", date: "2023-11-05" }
  ];
  
  const totalInvested = investmentData.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investmentData.reduce((sum, inv) => sum + inv.returns, 0);
  
  const transactionHistory = [
    { id: "TX123456", type: "deposit", amount: 10000, currency: "USDT", status: "completed", date: "2023-11-01" },
    { id: "TX123457", type: "investment", amount: 5000, currency: "USDT", status: "completed", date: "2023-11-02" },
    { id: "TX123458", type: "withdrawal", amount: 1000, currency: "USDT", status: "pending", date: "2023-11-05" },
    { id: "TX123459", type: "reward", amount: 250, currency: "CBT", status: "completed", date: "2023-11-06" }
  ];
  
  const performanceData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 25200 },
    { month: 'Mar', value: 26100 },
    { month: 'Apr', value: 27300 },
    { month: 'May', value: 28200 },
    { month: 'Jun', value: 27800 },
    { month: 'Jul', value: 29100 },
    { month: 'Aug', value: 32400 },
    { month: 'Sep', value: 35700 },
    { month: 'Oct', value: 39200 },
    { month: 'Nov', value: 42500 },
    { month: 'Dec', value: 45800 },
  ];
  
  const allocationData = portfolioData.map(coin => ({
    name: coin.name,
    value: coin.value,
    color: coin.color
  }));
  
  const upcomingEvents = [
    { title: "Quarterly Investor Call", date: "2023-12-15", time: "15:00 UTC" },
    { title: "Platform Beta Launch", date: "2024-01-10", time: "All day" },
    { title: "Token Distribution", date: "2024-02-01", time: "10:00 UTC" }
  ];
  
  const getInitials = (name: string = "") => {
    if (!name) return "CB";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getUserName = () => {
    if (!currentUser) return "";
    return (currentUser.user_metadata?.full_name as string) || currentUser.email?.split('@')[0] || "";
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/50';
      default:
        return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };
  
  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'investment':
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case 'reward':
        return <Wallet className="h-4 w-4 text-yellow-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Investor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {getUserName()}</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex items-center gap-2 text-xs md:text-sm flex-1 md:flex-initial justify-center">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm flex-1 md:flex-initial justify-center">
                Add Funds
              </Button>
            </div>
          </div>
          
          {/* Dashboard Tabs - Mobile Optimized */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-1 overflow-x-auto scrollbar-hide">
              <TabsList className="w-full grid grid-cols-4 min-w-[400px]">
                <TabsTrigger value="overview" className="text-xs md:text-sm py-2">Overview</TabsTrigger>
                <TabsTrigger value="investments" className="text-xs md:text-sm py-2">Investments</TabsTrigger>
                <TabsTrigger value="portfolio" className="text-xs md:text-sm py-2">Portfolio</TabsTrigger>
                <TabsTrigger value="transactions" className="text-xs md:text-sm py-2">Transactions</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <Card>
                  <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                      Total Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
                    <div className="text-base md:text-2xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
                    <div className="flex items-center mt-1 text-xs md:text-sm">
                      <span className="text-green-500 flex items-center mr-2">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        8.2%
                      </span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                      Total Invested
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
                    <div className="text-base md:text-2xl font-bold">{formatCurrency(totalInvested)}</div>
                    <div className="flex items-center mt-1 text-xs md:text-sm">
                      <span className="text-green-500 flex items-center mr-2">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        12.5%
                      </span>
                      <span className="text-muted-foreground">ROI</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                      Total Returns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
                    <div className="text-base md:text-2xl font-bold">{formatCurrency(totalReturns)}</div>
                    <div className="flex items-center mt-1 text-xs md:text-sm">
                      <span className="text-green-500 flex items-center mr-2">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        3.8%
                      </span>
                      <span className="text-muted-foreground">this week</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                      Investor Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
                    <div className="text-base md:text-2xl font-bold">Angel</div>
                    <div className="mt-1">
                      <div className="flex justify-between text-xs md:text-sm mb-1">
                        <span className="text-muted-foreground">To Venture</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                    <CardTitle className="text-base md:text-lg">Portfolio Performance</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Your investment growth over time</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 md:px-6 pb-4 md:pb-6">
                    <div className="h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis 
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                            width={60}
                            tick={{ fontSize: 10 }}
                          />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <Tooltip 
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(222 47% 11%)', 
                              borderColor: 'hsl(217 33% 17%)',
                              color: 'hsl(210 40% 98%)',
                              fontSize: '12px',
                              padding: '8px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#4ADE80" 
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                    <CardTitle className="text-base md:text-lg">Asset Allocation</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Distribution of your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 md:px-6 pb-4 md:pb-6">
                    <div className="h-[250px] md:h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {allocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(222 47% 11%)', 
                              borderColor: 'hsl(217 33% 17%)',
                              color: 'hsl(210 40% 98%)',
                              fontSize: '12px',
                              padding: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity and Upcoming Events */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3 px-4 md:px-6 py-4 md:py-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base md:text-lg">Recent Transactions</CardTitle>
                      <Button variant="ghost" size="sm" className="text-primary text-xs md:text-sm">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="space-y-4">
                      {transactionHistory.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                              transaction.type === 'deposit' || transaction.type === 'reward' 
                                ? 'bg-green-500/10' 
                                : transaction.type === 'withdrawal' 
                                  ? 'bg-red-500/10' 
                                  : 'bg-blue-500/10'
                            }`}>
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <div className="font-medium text-sm md:text-base capitalize">{transaction.type}</div>
                              <div className="text-xs text-muted-foreground">{transaction.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium text-sm md:text-base ${
                              transaction.type === 'deposit' || transaction.type === 'reward' 
                                ? 'text-green-500' 
                                : transaction.type === 'withdrawal' 
                                  ? 'text-red-500' 
                                  : ''
                            }`}>
                              {transaction.type === 'withdrawal' ? '-' : '+'}{transaction.amount} {transaction.currency}
                            </div>
                            <Badge variant="outline" className={`text-xs ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3 px-4 md:px-6 py-4 md:py-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base md:text-lg">Upcoming Events</CardTitle>
                      <Button variant="ghost" size="sm" className="text-primary text-xs md:text-sm">
                        Calendar
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm md:text-base">{event.title}</div>
                            <div className="text-xs text-muted-foreground">{event.date} • {event.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Investments Tab */}
            <TabsContent value="investments" className="space-y-6">
              <Card>
                <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base md:text-lg">Your Investments</CardTitle>
                      <CardDescription className="text-xs md:text-sm">Manage your active investments and returns</CardDescription>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm">
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
                    {investmentData.map((investment, index) => (
                      <div key={index} className="grid grid-cols-5 p-3 md:p-4 border-t items-center">
                        <div>
                          <div className="font-medium text-xs md:text-sm">{investment.name}</div>
                          <div className="text-xs text-muted-foreground">{investment.date}</div>
                        </div>
                        <div className="text-right font-medium text-xs md:text-sm">
                          {formatCurrency(investment.amount)}
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
              
              {/* Rest of investments tab content with similar mobile optimizations */}
            </TabsContent>
            
            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base md:text-lg">Crypto Portfolio</CardTitle>
                      <CardDescription className="text-xs md:text-sm">Your cryptocurrency holdings</CardDescription>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" className="text-xs md:text-sm flex-1 md:flex-initial">
                        Deposit
                      </Button>
                      <Button variant="outline" className="text-xs md:text-sm flex-1 md:flex-initial">
                        Withdraw
                      </Button>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm flex-1 md:flex-initial">
                        Trade
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4 md:pb-6 overflow-x-auto">
                  <div className="rounded-md border min-w-[600px]">
                    <div className="grid grid-cols-6 p-3 md:p-4 bg-muted/50 text-xs md:text-sm font-medium">
                      <div className="col-span-2">Asset</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Value</div>
                      <div className="text-right">Change (24h)</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {portfolioData.map((coin, index) => (
                      <div key={index} className="grid grid-cols-6 p-3 md:p-4 border-t items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${coin.color}20` }}>
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full" style={{ backgroundColor: coin.color }}></div>
                          </div>
                          <div>
                            <div className="font-medium text-xs md:text-sm">{coin.name}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right font-medium text-xs md:text-sm">
                          {coin.amount.toLocaleString()} {coin.symbol}
                        </div>
                        <div className="text-right font-medium text-xs md:text-sm">
                          {formatCurrency(coin.value)}
                        </div>
                        <div className="text-right">
                          <span className={`flex items-center justify-end text-xs md:text-sm ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coin.change >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                            {Math.abs(coin.change)}%
                          </span>
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
                              <DropdownMenuItem className="text-xs md:text-sm">Buy More</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs md:text-sm">Sell</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs md:text-sm">Transfer</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs md:text-sm">View History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Rest of portfolio tab content with similar mobile optimizations */}
            </TabsContent>
            
            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base md:text-lg">Transaction History</CardTitle>
                      <CardDescription className="text-xs md:text-sm">View and filter your transaction history</CardDescription>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" className="text-xs md:text-sm flex-1 md:flex-initial">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm flex-1 md:flex-initial">
                        New Transaction
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4 md:pb-6 overflow-x-auto">
                  <div className="rounded-md border min-w-[600px]">
                    <div className="grid grid-cols-6 p-3 md:p-4 bg-muted/50 text-xs md:text-sm font-medium">
                      <div className="col-span-2">Transaction</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Currency</div>
                      <div className="text-center">Status</div>
                      <div className="text-right">Date</div>
                    </div>
                    {transactionHistory.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-6 p-3 md:p-4 border-t items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'deposit' || transaction.type === 'reward' 
                              ? 'bg-green-500/10' 
                              : transaction.type === 'withdrawal' 
                                ? 'bg-red-500/10' 
                                : 'bg-blue-500/10'
                          }`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="font-medium text-xs md:text-sm capitalize">{transaction.type}</div>
                            <div className="text-xs text-muted-foreground">{transaction.id}</div>
                          </div>
                        </div>
                        <div className="text-right font-medium text-xs md:text-sm">
                          {transaction.amount.toLocaleString()}
                        </div>
                        <div className="text-right text-xs md:text-sm">
                          {transaction.currency}
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="text-right text-muted-foreground text-xs md:text-sm">
                          {transaction.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Rest of transactions tab content with similar mobile optimizations */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}