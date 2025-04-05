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
  Copy
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
    // ... rest of the mock data
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
    // ... rest of the mock data
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
        {/* ... rest of the JSX ... */}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;