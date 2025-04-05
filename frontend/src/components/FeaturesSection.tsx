import { 
  Coins, 
  Shield, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Lock,
  Trophy,
  Percent,
  Ticket
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Percent className="h-10 w-10 text-primary" />,
      title: "Revenue Sharing",
      description: "Earn 8% of casino profits distributed quarterly to all investors based on ownership stake."
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Early Investor Bonus",
      description: "Pre-launch investors receive 20% bonus tokens and lifetime VIP status on the platform."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Token Appreciation",
      description: "As player base grows, token value is projected to increase 300% within first year post-launch."
    },
    {
      icon: <Ticket className="h-10 w-10 text-primary" />,
      title: "Liquidity Options",
      description: "Tokens will be listed on major exchanges within 6 months of launch for easy trading."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Transparent Reporting",
      description: "Monthly financial reports and quarterly investor calls to keep you informed on performance."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secured Investment",
      description: "Your investment is secured by legal contracts and backed by our gaming license and assets."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-semibold text-primary">INVESTOR BENEFITS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Back Our Casino</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CryptoBet offers early investors exclusive benefits and multiple revenue streams from our innovative casino platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-block">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}