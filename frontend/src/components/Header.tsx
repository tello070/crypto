import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/login">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Register</Button>
          </Link>
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
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/invest" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Invest</Link>
                <Link to="/coins" className="text-lg py-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Coins</Link>
              </nav>
              <div className="mt-auto mb-8 flex flex-col gap-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-primary text-primary">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground">Register</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}