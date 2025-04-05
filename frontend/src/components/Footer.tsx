import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">CB</span>
              </div>
              <span className="text-xl font-bold tracking-tight">CryptoBet</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The future of crypto casino investment. Secure, transparent, and profitable.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/invest" className="text-muted-foreground hover:text-primary transition-colors">Invest</Link></li>
              <li><Link to="/coins" className="text-muted-foreground hover:text-primary transition-colors">Coins</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/compliance" className="text-muted-foreground hover:text-primary transition-colors">Compliance</Link></li>
              <li><Link to="/licenses" className="text-muted-foreground hover:text-primary transition-colors">Licenses</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">support@cryptobet.com</li>
              <li className="text-muted-foreground">+1 (555) 123-4567</li>
              <li className="text-muted-foreground">123 Blockchain Ave, Crypto City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CryptoBet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}