import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Search, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download, 
  Users, 
  CreditCard, 
  ArrowUpDown, 
  ChevronDown,
  Loader2,
  Filter,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("investments");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [investmentFilter, setInvestmentFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock data for investments
  const investmentRequests = [
    { 
      id: "INV123456", 
      userId: "user1", 
      userName: "John Doe", 
      email: "john@example.com",
      amount: 5000, 
      coin: "BTC", 
      coinAmount: 0.076, 
      cbcAmount: 10000, 
      status: "pending", 
      date: "2023-11-15", 
      transactionHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" 
    },
    { 
      id: "INV123457", 
      userId: "user2", 
      userName: "Alice Smith", 
      email: "alice@example.com",
      amount: 10000, 
      coin: "ETH", 
      coinAmount: 2.84, 
      cbcAmount: 20000, 
      status: "approved", 
      date: "2023-11-14", 
      transactionHash: "0x82D8678FC7ab88b098defB751B7401B5f6d89123" 
    },
    { 
      id: "INV123458", 
      userId: "user3", 
      userName: "Bob Johnson", 
      email: "bob@example.com",
      amount: 2500, 
      coin: "SOL", 
      coinAmount: 17.5, 
      cbcAmount: 5000, 
      status: "rejected", 
      date: "2023-11-13", 
      transactionHash: "0x93E9789FC7ab88b098defB751B7401B5f6d89456" 
    },
    { 
      id: "INV123459", 
      userId: "user4", 
      userName: "Emma Wilson", 
      email: "emma@example.com",
      amount: 7500, 
      coin: "USDT", 
      coinAmount: 7500, 
      cbcAmount: 15000, 
      status: "pending", 
      date: "2023-11-12", 
      transactionHash: "0xA4F0890FC7ab88b098defB751B7401B5f6d89789" 
    },
    { 
      id: "INV123460", 
      userId: "user5", 
      userName: "Michael Brown", 
      email: "michael@example.com",
      amount: 15000, 
      coin: "BTC", 
      coinAmount: 0.229, 
      cbcAmount: 30000, 
      status: "approved", 
      date: "2023-11-11", 
      transactionHash: "0xB5G1901FC7ab88b098defB751B7401B5f6d80123" 
    }
  ];
  
  // Mock data for users
  const users = [
    { 
      id: "user1", 
      name: "John Doe", 
      email: "john@example.com", 
      role: "user", 
      status: "active", 
      joinDate: "2023-10-01", 
      totalInvested: 5000, 
      kycStatus: "verified" 
    },
    { 
      id: "user2", 
      name: "Alice Smith", 
      email: "alice@example.com", 
      role: "user", 
      status: "active", 
      joinDate: "2023-10-05", 
      totalInvested: 10000, 
      kycStatus: "verified" 
    },
    { 
      id: "user3", 
      name: "Bob Johnson", 
      email: "bob@example.com", 
      role: "user", 
      status: "inactive", 
      joinDate: "2023-10-10", 
      totalInvested: 2500, 
      kycStatus: "pending" 
    },
    { 
      id: "user4", 
      name: "Emma Wilson", 
      email: "emma@example.com", 
      role: "user", 
      status: "active", 
      joinDate: "2023-10-15", 
      totalInvested: 7500, 
      kycStatus: "verified" 
    },
    { 
      id: "user5", 
      name: "Michael Brown", 
      email: "michael@example.com", 
      role: "admin", 
      status: "active", 
      joinDate: "2023-09-01", 
      totalInvested: 15000, 
      kycStatus: "verified" 
    },
    { 
      id: "user6", 
      name: "Sarah Davis", 
      email: "sarah@example.com", 
      role: "user", 
      status: "active", 
      joinDate: "2023-10-20", 
      totalInvested: 0, 
      kycStatus: "unverified" 
    }
  ];
  
  // Filter investments based on status
  const filteredInvestments = investmentRequests.filter(investment => {
    if (investmentFilter === "all") return true;
    return investment.status === investmentFilter;
  }).filter(investment => {
    if (!searchQuery) return true;
    return (
      investment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  // Filter users based on role and search
  const filteredUsers = users.filter(user => {
    if (userFilter === "all") return true;
    if (userFilter === "admin") return user.role === "admin";
    if (userFilter === "active") return user.status === "active";
    if (userFilter === "inactive") return user.status === "inactive";
    return true;
  }).filter(user => {
    if (!searchQuery) return true;
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/50">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/50">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50">Pending</Badge>;
      case "verified":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/50">Verified</Badge>;
      case "unverified":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/50">Unverified</Badge>;
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/50">Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/50">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Handle investment approval
  const handleApproveInvestment = () => {
    if (!selectedInvestment) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the database here
      setIsProcessing(false);
      setShowInvestmentDetails(false);
      
      // Show success message
      alert(`Investment ${selectedInvestment.id} approved successfully`);
    }, 1500);
  };
  
  // Handle investment rejection
  const handleRejectInvestment = () => {
    if (!selectedInvestment) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the database here
      setIsProcessing(false);
      setShowInvestmentDetails(false);
      
      // Show success message
      alert(`Investment ${selectedInvestment.id} rejected`);
    }, 1500);
  };
  
  // Handle refresh data
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Admin Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage investments and users</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex-shrink-0"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          
          {/* Admin Dashboard Tabs */}
          <Tabs defaultValue="investments" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-1">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="investments" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Investment Requests</span>
                  <span className="sm:hidden">Investments</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Investments Tab */}
            <TabsContent value="investments" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Investment Requests</CardTitle>
                      <CardDescription>Review and manage investment requests</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Filter className="h-3.5 w-3.5" />
                            <span>{investmentFilter === "all" ? "All Status" : investmentFilter}</span>
                            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setInvestmentFilter("all")}>
                            All Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setInvestmentFilter("pending")}>
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setInvestmentFilter("approved")}>
                            Approved
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setInvestmentFilter("rejected")}>
                            Rejected
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInvestments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No investment requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredInvestments.map((investment) => (
                            <TableRow key={investment.id}>
                              <TableCell className="font-mono text-xs">{investment.id}</TableCell>
                              <TableCell>
                                <div className="font-medium">{investment.userName}</div>
                                <div className="text-xs text-muted-foreground">{investment.email}</div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{investment.date}</TableCell>
                              <TableCell className="text-right">
                                <div>{formatCurrency(investment.amount)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {investment.coinAmount} {investment.coin}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                {getStatusBadge(investment.status)}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedInvestment(investment);
                                        setShowInvestmentDetails(true);
                                      }}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    {investment.status === "pending" && (
                                      <>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            setSelectedInvestment(investment);
                                            handleApproveInvestment();
                                          }}
                                          className="text-green-500"
                                        >
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Approve
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            setSelectedInvestment(investment);
                                            handleRejectInvestment();
                                          }}
                                          className="text-red-500"
                                        >
                                          <XCircle className="mr-2 h-4 w-4" />
                                          Reject
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>View and manage platform users</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Filter className="h-3.5 w-3.5" />
                            <span>{userFilter === "all" ? "All Users" : userFilter}</span>
                            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setUserFilter("all")}>
                            All Users
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setUserFilter("admin")}>
                            Admins
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setUserFilter("active")}>
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setUserFilter("inactive")}>
                            Inactive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead className="hidden md:table-cell">Join Date</TableHead>
                          <TableHead className="text-right hidden md:table-cell">Total Invested</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-center">Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No users found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-mono text-xs">{user.id}</TableCell>
                              <TableCell>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{user.joinDate}</TableCell>
                              <TableCell className="text-right hidden md:table-cell">
                                {formatCurrency(user.totalInvested)}
                              </TableCell>
                              <TableCell className="text-center">
                                {getStatusBadge(user.status)}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={user.role === "admin" ? "default" : "outline"}>
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Profile
                                    </DropdownMenuItem>
                                    {user.status === "active" ? (
                                      <DropdownMenuItem className="text-red-500">
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Deactivate
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem className="text-green-500">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Activate
                                      </DropdownMenuItem>
                                    )}
                                    {user.role === "user" ? (
                                      <DropdownMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        Make Admin
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        Remove Admin
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* Investment Details Dialog */}
      <Dialog open={showInvestmentDetails} onOpenChange={setShowInvestmentDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Investment Request Details</DialogTitle>
            <DialogDescription>
              Review the investment request details before approving or rejecting
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvestment && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Investment ID</p>
                  <p className="font-mono">{selectedInvestment.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{selectedInvestment.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">User</p>
                  <p>{selectedInvestment.userName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedInvestment.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Amount (USD)</p>
                  <p className="font-semibold">{formatCurrency(selectedInvestment.amount)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Crypto Amount</p>
                  <p>{selectedInvestment.coinAmount} {selectedInvestment.coin}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">CBC Tokens</p>
                  <p>{selectedInvestment.cbcAmount.toLocaleString()} CBC</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div>{getStatusBadge(selectedInvestment.status)}</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs bg-muted p-2 rounded-md overflow-x-auto">
                    {selectedInvestment.transactionHash}
                  </p>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {selectedInvestment.status === "pending" && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4">
                  <p className="text-yellow-500 font-medium">Verification Required</p>
                  <p className="text-sm text-muted-foreground">
                    Please verify the transaction hash on the blockchain before approving this investment.
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowInvestmentDetails(false)}
              className="sm:w-auto w-full"
            >
              Close
            </Button>
            
            {selectedInvestment && selectedInvestment.status === "pending" && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={handleRejectInvestment}
                  disabled={isProcessing}
                  className="sm:w-auto w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleApproveInvestment}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700 text-white sm:w-auto w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </>
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}