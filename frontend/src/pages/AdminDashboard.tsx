```typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
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
  ChevronDown,
  Loader2,
  Filter,
  RefreshCw,
  Shield,
  Copy,
  UserCog,
  Wallet,
  Ban,
  UserCheck
} from "lucide-react";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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
      id: "INV789012", 
      userId: "user2", 
      userName: "Jane Smith", 
      email: "jane@example.com",
      amount: 2500, 
      coin: "ETH", 
      coinAmount: 0.98, 
      cbcAmount: 5000, 
      status: "pending", 
      date: "2023-11-16", 
      transactionHash: "0x3a539f6e99bbf7d37165d2c24b9d774b0c2a0d4d" 
    },
    { 
      id: "INV345678", 
      userId: "user3", 
      userName: "Alex Johnson", 
      email: "alex@example.com",
      amount: 10000, 
      coin: "BTC", 
      coinAmount: 0.152, 
      cbcAmount: 20000, 
      status: "approved", 
      date: "2023-11-14", 
      transactionHash: "0x8901e3c9b5c234f6789012d3e4f56a7b8c90123d" 
    },
    { 
      id: "INV901234", 
      userId: "user4", 
      userName: "Sam Wilson", 
      email: "sam@example.com",
      amount: 7500, 
      coin: "ETH", 
      coinAmount: 2.94, 
      cbcAmount: 15000, 
      status: "rejected", 
      date: "2023-11-13", 
      transactionHash: "0x4567e8901a2b3c4d5e6f7890123456789abcdef0" 
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
      name: "Jane Smith", 
      email: "jane@example.com", 
      role: "user", 
      status: "active", 
      joinDate: "2023-10-05", 
      totalInvested: 2500, 
      kycStatus: "verified" 
    },
    { 
      id: "user3", 
      name: "Alex Johnson", 
      email: "alex@example.com", 
      role: "user", 
      status: "active", 
      joinDate: "2023-09-28", 
      totalInvested: 10000, 
      kycStatus: "verified" 
    },
    { 
      id: "user4", 
      name: "Sam Wilson", 
      email: "sam@example.com", 
      role: "user", 
      status: "inactive", 
      joinDate: "2023-09-15", 
      totalInvested: 7500, 
      kycStatus: "unverified" 
    },
    { 
      id: "user5", 
      name: "Admin User", 
      email: "admin@example.com", 
      role: "admin", 
      status: "active", 
      joinDate: "2023-08-01", 
      totalInvested: 0, 
      kycStatus: "verified" 
    }
  ];

  // Filter investments based on status and search
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

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      // In a real app, you would call an API to update the user role
      console.log(`Changing user ${userId} role to ${newRole}`);
      
      toast({
        title: "Role updated",
        description: `User role has been changed to ${newRole}.`,
      });
      
      // Simulate API call
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
      
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  // Handle user status change
  const handleStatusChange = async (userId: string, newStatus: 'active' | 'inactive') => {
    try {
      // In a real app, you would call an API to update the user status
      console.log(`Changing user ${userId} status to ${newStatus}`);
      
      toast({
        title: "Status updated",
        description: `User status has been changed to ${newStatus}.`,
      });
      
      // Simulate API call
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
      
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  // Handle investment approval
  const handleApproveInvestment = () => {
    if (!selectedInvestment) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowInvestmentDetails(false);
      
      toast({
        title: "Investment approved",
        description: `Investment ${selectedInvestment.id} has been approved successfully.`,
      });
    }, 1500);
  };

  // Handle investment rejection
  const handleRejectInvestment = () => {
    if (!selectedInvestment) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowInvestmentDetails(false);
      
      toast({
        title: "Investment rejected",
        description: `Investment ${selectedInvestment.id} has been rejected.`,
      });
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage investment requests and users</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Actions
              </Button>
            </div>
          </div>

          <Card className="shadow-lg border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-primary/5">
            <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">Admin Control Panel</CardTitle>
                  <CardDescription>
                    Manage investment requests and user accounts
                  </CardDescription>
                </div>
                <div className="w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by ID, name or email..."
                      className="pl-8 w-full md:w-[260px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="investments" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-border/40">
                  <div className="container px-6">
                    <TabsList className="bg-transparent h-14 p-0">
                      <TabsTrigger 
                        value="investments"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-4 font-medium"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Investment Requests
                      </TabsTrigger>
                      <TabsTrigger 
                        value="users"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-4 font-medium"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        User Management
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="investments" className="p-0 m-0">
                  <div className="container p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                              <Filter className="h-3.5 w-3.5 mr-2" />
                              {investmentFilter === "all" ? "All Statuses" : 
                               investmentFilter === "pending" ? "Pending" : 
                               investmentFilter === "approved" ? "Approved" : 
                               "Rejected"}
                              <ChevronDown className="h-3.5 w-3.5 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => setInvestmentFilter("all")}>
                              All Statuses
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
                        <span className="text-sm text-muted-foreground">
                          {filteredInvestments.length} {filteredInvestments.length === 1 ? 'request' : 'requests'} found
                        </span>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Coin</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredInvestments.length > 0 ? (
                            filteredInvestments.map((investment) => (
                              <TableRow key={investment.id} className="group">
                                <TableCell className="font-mono text-xs">
                                  {investment.id}
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{investment.userName}</div>
                                  <div className="text-sm text-muted-foreground">{investment.email}</div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">${investment.amount.toLocaleString()}</div>
                                  <div className="text-sm text-muted-foreground">{investment.cbcAmount.toLocaleString()} CBC</div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{investment.coin}</div>
                                  <div className="text-sm text-muted-foreground">{investment.coinAmount} {investment.coin}</div>
                                </TableCell>
                                <TableCell>
                                  {new Date(investment.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(investment.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        setSelectedInvestment(investment);
                                        setShowInvestmentDetails(true);
                                      }}
                                      className="h-8 w-8 opacity-70 group-hover:opacity-100"
                                    >
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">View details</span>
                                    </Button>
                                    {investment.status === "pending" && (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => {
                                            setSelectedInvestment(investment);
                                            handleApproveInvestment();
                                          }}
                                          className="h-8 w-8 text-green-500 opacity-70 group-hover:opacity-100"
                                        >
                                          <CheckCircle className="h-4 w-4" />
                                          <span className="sr-only">Approve</span>
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => {
                                            setSelectedInvestment(investment);
                                            handleRejectInvestment();
                                          }}
                                          className="h-8 w-8 text-red-500 opacity-70 group-hover:opacity-100"
                                        >
                                          <XCircle className="h-4 w-4" />
                                          <span className="sr-only">Reject</span>
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="h-24 text-center">
                                No investment requests found.
                              </TableCell>
                            </TableRow>
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
                  </div>
                </TabsContent>

                <TabsContent value="users" className="p-0 m-0">
                  <div className="container p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                              <Filter className="h-3.5 w-3.5 mr-2" />
                              {userFilter === "all" ? "All Users" : 
                               userFilter === "admin" ? "Admins" : 
                               userFilter === "active" ? "Active" : 
                               "Inactive"}
                              <ChevronDown className="h-3.5 w-3.5 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
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
                        <span className="text-sm text-muted-foreground">
                          {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                        </span>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead>KYC Status</TableHead>
                            <TableHead>Total Invested</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                              <TableRow key={user.id} className="group">
                                <TableCell>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-muted-foreground">{user.email}</div>
                                </TableCell>
                                <TableCell>
                                  {user.role === "admin" ? (
                                    <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/50">Admin</Badge>
                                  ) : (
                                    <Badge variant="outline">User</Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(user.status)}
                                </TableCell>
                                <TableCell>
                                  {new Date(user.joinDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(user.kycStatus)}
                                </TableCell>
                                <TableCell>
                                  ${user.totalInvested.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 opacity-70 group-hover:opacity-100"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Wallet className="h-4 w-4 mr-2" />
                                        View Investments
                                      </DropdownMenuItem>
                                      {user.role === "user" ? (
                                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "admin")}>
                                          <Shield className="h-4 w-4 mr-2" />
                                          Make Admin
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "user")}>
                                          <UserCog className="h-4 w-4 mr-2" />
                                          Remove Admin
                                        </DropdownMenuItem>
                                      )}
                                      {user.status === "active" ? (
                                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                                          <Ban className="h-4 w-4 mr-2" />
                                          Deactivate User
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                          <UserCheck className="h-4 w-4 mr-2" />
                                          Activate User
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="h-24 text-center">
                                No users found.
                              </TableCell>
                            </TableRow>
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
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Investment Details Dialog */}
      <Dialog open={showInvestmentDetails} onOpenChange={setShowInvestmentDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Investment Request Details</DialogTitle>
            <DialogDescription>
              Review the investment request details before taking action.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvestment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">ID</h4>
                  <p className="font-mono text-sm">{selectedInvestment.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <div>{getStatusBadge(selectedInvestment.status)}</div>
                </div>
                <div>
                  <h4 className