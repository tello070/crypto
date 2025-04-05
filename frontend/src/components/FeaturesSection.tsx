import { 
  Coins, 
  Shield, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Lock
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Coins className="h-10 w-10 text-primary" />,
      title: "Multiple Cryptocurrencies",
      description: "Invest using Bitcoin, Ethereum, Solana and more. Diversify your portfolio across multiple tokens."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with multi-signature wallets and cold storage for maximum protection."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "High ROI",
      description: "Average returns of 12% annually with our proven investment strategies and profit sharing."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Instant Withdrawals",
      description: "Access your funds anytime with our lightning-fast withdrawal system and low fees."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Real-time Analytics",
      description: "Track your investments with comprehensive dashboards and performance metrics."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Regulatory Compliance",
      description: "Fully compliant with international regulations and KYC/AML requirements."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest With Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CryptoBet offers a unique investment opportunity in the rapidly growing crypto casino market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}