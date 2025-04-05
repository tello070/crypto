import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
    return (currentUser.user_metadata?.full_name as string) || "";
  };

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">CB</span>
          </div>
          <span className="text-xl font-bold tracking-tight">CryptoBet</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">About</Link>
          <Link to="/invest" className="text-foreground/80 hover:text-primary transition-colors">Invest</Link>
          <Link to="/coins" className="text-foreground/80 hover:text-primary transition-colors">Coins</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-muted text-primary">
                      {getInitials(getUserName())}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              {currentUser && (
                <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-muted text-primary">
                      {getInitials(getUserName())}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{getUserName()}</p>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
              )}
              
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/invest" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Invest</Link>
                <Link to="/coins" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Coins</Link>
              </nav>
              
              <div className="mt-auto mb-8 flex flex-col gap-4">
                {currentUser ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-primary text-primary">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}