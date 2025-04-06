import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { 
  Search, MoreHorizontal, CheckCircle, XCircle, Eye, 
  Users, CreditCard, ChevronDown, Loader2, Filter, RefreshCw, Shield, Copy
} from "lucide-react";

export function AdminDashboard() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("investments");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [investmentFilter, setInvestmentFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch investments from database
  const fetchInvestments = async () => {
    try {
      setIsRefreshing(true);
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setInvestments(data || []);
    } catch (error) {
      console.error("Error fetching investments:", error);
      toast({
        title: "Failed to load investments",
        description: error.message || "Could not load investment data",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // Fetch users from database
  const fetchUsers = async () => {
    try {
      // In a real app, you would fetch users from the database
      // For now, we'll use mock data
      setUsers([
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
      ]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchInvestments();
    fetchUsers();
  }, []);

  // Filter investments based on status and search
  const filteredInvestments = investments.filter(investment => {
    if (investmentFilter === "all") return true;
    return investment.status === investmentFilter;
  }).filter(investment => {
    if (!searchQuery) return true;
    return (
      investment.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.email?.toLowerCase().includes(searchQuery.toLowerCase())
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
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.name || "").toLowerCase().includes(searchLower) ||
      (user.email || "").toLowerCase().includes(searchLower) ||
      (user.id || "").toLowerCase().includes(searchLower)
    );
  });

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
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
        return <Badge variant="outline">{status || "Unknown"}</Badge>;
    }
  };

  // Handle investment approval
  const handleApproveInvestment = async () => {
    if (!selectedInvestment) return;
    
    setIsProcessing(true);
    
    try {
      const { error } = await supabase
        .from('investments')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', selectedInvestment.id);
      
      if (error) throw error;
      
      toast({
        title: "Investment approved",
        description: `Investment has been approved successfully.`,
      });
      
      setShowInvestmentDetails(false);
      fetchInvestments(); // Refresh the list
    } catch (error) {
      console.error("Error approving investment:", error);
      toast({
        title: "Approval failed",
        description: error.message || "Failed to approve investment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle investment rejection
  const handleRejectInvestment = async () => {
    if (!selectedInvestment) return;
    
    setIsProcessing(true);
    
    try {
      const { error } = await supabase
        .from('investments')
        .update({ status: 'rejected', updated_at: new Date().toISOString() })
        .eq('id', selectedInvestment.id);
      
      if (error) throw error;
      
      toast({
        title: "Investment rejected",
        description: `Investment has been rejected.`,
      });
      
      setShowInvestmentDetails(false);
      fetchInvestments(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting investment:", error);
      toast({
        title: "Rejection failed",
        description: error.message || "Failed to reject investment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle refresh data
  const handleRefresh = () => {
    fetchInvestments();
    fetchUsers();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
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
                          {isLoading ? (
                            <TableRow>
                              <TableCell colSpan={7} className="h-24 text-center">
                                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                <div className="mt-2 text-sm text-muted-foreground">Loading investment data...</div>
                              </TableCell>
                            </TableRow>
                          ) : filteredInvestments.length > 0 ? (
                            filteredInvestments.map((investment) => (
                              <TableRow key={investment.id} className="group">
                                <TableCell className="font-mono text-xs">
                                  {typeof investment.id === 'string' && investment.id.length > 8 
                                    ? `${investment.id.substring(0, 8)}...` 
                                    : investment.id}
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{investment.user_name}</div>
                                  <div className="text-sm text-muted-foreground">{investment.email}</div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">${parseFloat(investment.amount).toLocaleString()}</div>
                                  <div className="text-sm text-muted-foreground">{parseFloat(investment.cbc_amount).toLocaleString()} CBC</div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{investment.coin}</div>
                                  <div className="text-sm text-muted-foreground">{parseFloat(investment.coin_amount).toFixed(6)} {investment.coin}</div>
                                </TableCell>
                                <TableCell>
                                  {formatDate(investment.created_at)}
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
                                  {formatDate(user.joinDate)}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(user.kycStatus)}
                                </TableCell>
                                <TableCell>
                                  ${user.totalInvested?.toLocaleString() || 0}
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
                                        Make Admin
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        {user.status === "inactive" ? "Activate User" : "Deactivate User"}
                                      </DropdownMenuItem>
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
                  <h4 className="text-sm font-medium text-muted-foreground">User</h4>
                  <p>{selectedInvestment.user_name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p>{selectedInvestment.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                  <p>${parseFloat(selectedInvestment.amount).toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">CBC Amount</h4>
                  <p>{parseFloat(selectedInvestment.cbc_amount).toLocaleString()} CBC</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Coin</h4>
                  <p>{selectedInvestment.coin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Coin Amount</h4>
                  <p>{parseFloat(selectedInvestment.coin_amount).toFixed(6)} {selectedInvestment.coin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p>{formatDate(selectedInvestment.created_at)}</p>
                </div>
              </div>
              
              {selectedInvestment.transaction_hash && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Transaction Hash</h4>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted p-2 rounded text-xs font-mono w-full overflow-x-auto">
                      {selectedInvestment.transaction_hash}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedInvestment.transaction_hash);
                        toast({
                          title: "Copied",
                          description: "Transaction hash copied to clipboard",
                        });
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            {selectedInvestment && selectedInvestment.status === "pending" && (
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleRejectInvestment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
                <Button
                  variant="default"
                  onClick={handleApproveInvestment}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Approve
                </Button>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => setShowInvestmentDetails(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}