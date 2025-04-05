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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Investor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {getUserName()}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Data</span>
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Add Funds
              </Button>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-1">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
                    <div className="flex items-center mt-1 text-sm">
                      <span className="text-green-500 flex items-center mr-2">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        8.2%
                      </span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Invested
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
                    <div className="flex items-center mt-1 text-sm">
                      <span className="text-green-500 flex items-center mr-2">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        12.5%
                      </span>
                      <span className="text-muted-foreground">ROI</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Returns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalReturns)}</div>
                    <div className="flex items-center mt-1 text-sm">
                      <span className="text-green-500 flex items-center mr-2">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        3.8%
                      </span>
                      <span className="text-muted-foreground">this week</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Investor Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Angel Investor</div>
                    <div className="mt-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress to Venture</span>
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
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Your investment growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" />
                          <YAxis 
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                            width={80}
                          />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <Tooltip 
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(222 47% 11%)', 
                              borderColor: 'hsl(217 33% 17%)',
                              color: 'hsl(210 40% 98%)'
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
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                    <CardDescription>Distribution of your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
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
                              color: 'hsl(210 40% 98%)'
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
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Transactions</CardTitle>
                      <Button variant="ghost" size="sm" className="text-primary">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactionHistory.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.type === 'deposit' || transaction.type === 'reward' 
                                ? 'bg-green-500/10' 
                                : transaction.type === 'withdrawal' 
                                  ? 'bg-red-500/10' 
                                  : 'bg-blue-500/10'
                            }`}>
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <div className="font-medium capitalize">{transaction.type}</div>
                              <div className="text-sm text-muted-foreground">{transaction.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${
                              transaction.type === 'deposit' || transaction.type === 'reward' 
                                ? 'text-green-500' 
                                : transaction.type === 'withdrawal' 
                                  ? 'text-red-500' 
                                  : ''
                            }`}>
                              {transaction.type === 'withdrawal' ? '-' : '+'}{transaction.amount} {transaction.currency}
                            </div>
                            <Badge variant="outline" className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Events</CardTitle>
                      <Button variant="ghost" size="sm" className="text-primary">
                        View calendar
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-muted-foreground">{event.date} • {event.time}</div>
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
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Your Investments</CardTitle>
                      <CardDescription>Manage your active investments and returns</CardDescription>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      New Investment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 bg-muted/50 text-sm font-medium">
                      <div>Investment</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Returns</div>
                      <div className="text-center">Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {investmentData.map((investment, index) => (
                      <div key={index} className="grid grid-cols-5 p-4 border-t items-center">
                        <div>
                          <div className="font-medium">{investment.name}</div>
                          <div className="text-sm text-muted-foreground">{investment.date}</div>
                        </div>
                        <div className="text-right font-medium">
                          {formatCurrency(investment.amount)}
                        </div>
                        <div className="text-right text-green-500 font-medium">
                          +{formatCurrency(investment.returns)}
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className={getStatusColor(investment.status)}>
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Reinvest Returns</DropdownMenuItem>
                              <DropdownMenuItem>Withdraw Returns</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Performance</CardTitle>
                    <CardDescription>ROI over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis 
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                            width={80}
                          />
                          <Tooltip 
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(222 47% 11%)', 
                              borderColor: 'hsl(217 33% 17%)',
                              color: 'hsl(210 40% 98%)'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#4ADE80" 
                            strokeWidth={2} 
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Available Investment Plans</CardTitle>
                    <CardDescription>Explore new opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-border bg-muted/20 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Venture Partner</h3>
                            <p className="text-sm text-muted-foreground">2.5% revenue share</p>
                          </div>
                          <Badge>Popular</Badge>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                          <span>Min. Investment: $100,000</span>
                          <span className="text-primary">ROI: 250-320%</span>
                        </div>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                          View Details
                        </Button>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-border bg-muted/20 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Founding Member</h3>
                            <p className="text-sm text-muted-foreground">15% revenue share</p>
                          </div>
                          <Badge variant="outline">Limited</Badge>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                          <span>Min. Investment: $500,000</span>
                          <span className="text-primary">ROI: 300-400%</span>
                        </div>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Crypto Portfolio</CardTitle>
                      <CardDescription>Your cryptocurrency holdings</CardDescription>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">
                        Deposit
                      </Button>
                      <Button variant="outline">
                        Withdraw
                      </Button>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Trade
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 bg-muted/50 text-sm font-medium">
                      <div className="col-span-2">Asset</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Value</div>
                      <div className="text-right">Change (24h)</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {portfolioData.map((coin, index) => (
                      <div key={index} className="grid grid-cols-6 p-4 border-t items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${coin.color}20` }}>
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: coin.color }}></div>
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right font-medium">
                          {coin.amount.toLocaleString()} {coin.symbol}
                        </div>
                        <div className="text-right font-medium">
                          {formatCurrency(coin.value)}
                        </div>
                        <div className="text-right">
                          <span className={`flex items-center justify-end ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coin.change >= 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
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
                              <DropdownMenuItem>Buy More</DropdownMenuItem>
                              <DropdownMenuItem>Sell</DropdownMenuItem>
                              <DropdownMenuItem>Transfer</DropdownMenuItem>
                              <DropdownMenuItem>View History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Price Charts</CardTitle>
                    <CardDescription>24h price movement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="btc">
                      <TabsList className="mb-4">
                        <TabsTrigger value="btc">BTC</TabsTrigger>
                        <TabsTrigger value="eth">ETH</TabsTrigger>
                        <TabsTrigger value="sol">SOL</TabsTrigger>
                        <TabsTrigger value="cbt">CBT</TabsTrigger>
                      </TabsList>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis 
                              tickFormatter={(value) => `$${value.toLocaleString()}`}
                              width={80}
                            />
                            <Tooltip 
                              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                              contentStyle={{ 
                                backgroundColor: 'hsl(222 47% 11%)', 
                                borderColor: 'hsl(217 33% 17%)',
                                color: 'hsl(210 40% 98%)'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#F7931A" 
                              strokeWidth={2} 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Market News</CardTitle>
                    <CardDescription>Latest crypto updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b border-border pb-4">
                        <h3 className="font-medium mb-1">Bitcoin Surges Past $70K on ETF Approval News</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Bitcoin reached a new all-time high following positive regulatory developments.
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">2 hours ago</span>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Read more
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-b border-border pb-4">
                        <h3 className="font-medium mb-1">Ethereum Completes Major Network Upgrade</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          The upgrade promises improved scalability and lower gas fees for users.
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">5 hours ago</span>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Read more
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">CryptoBet Platform Secures $5M in Funding</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          The investment will accelerate development and marketing efforts.
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">1 day ago</span>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Read more
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>View and filter your transaction history</CardDescription>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        New Transaction
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 bg-muted/50 text-sm font-medium">
                      <div className="col-span-2">Transaction</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Currency</div>
                      <div className="text-center">Status</div>
                      <div className="text-right">Date</div>
                    </div>
                    {transactionHistory.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-6 p-4 border-t items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'deposit' || transaction.type === 'reward' 
                              ? 'bg-green-500/10' 
                              : transaction.type === 'withdrawal' 
                                ? 'bg-red-500/10' 
                                : 'bg-blue-500/10'
                          }`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="font-medium capitalize">{transaction.type}</div>
                            <div className="text-sm text-muted-foreground">{transaction.id}</div>
                          </div>
                        </div>
                        <div className="text-right font-medium">
                          {transaction.amount.toLocaleString()}
                        </div>
                        <div className="text-right">
                          {transaction.currency}
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="text-right text-muted-foreground">
                          {transaction.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deposit Funds</CardTitle>
                    <CardDescription>Add funds to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                          <Wallet className="h-6 w-6 mb-1" />
                          <span>Crypto</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                          <CreditCard className="h-6 w-6 mb-1" />
                          <span>Card</span>
                        </Button>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Withdraw Funds</CardTitle>
                    <CardDescription>Withdraw to your wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                          <Wallet className="h-6 w-6 mb-1" />
                          <span>Crypto</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                          <CreditCard className="h-6 w-6 mb-1" />
                          <span>Bank</span>
                        </Button>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Bitcoin Wallet</div>
                            <div className="text-xs text-muted-foreground">bc1q...8x4j</div>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Visa Card</div>
                            <div className="text-xs text-muted-foreground">****4582</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}