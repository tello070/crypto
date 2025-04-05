import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Coins, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm mb-6 border border-border animate-pulse">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Pre-launch Funding Round</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Invest in the Next Big Crypto Casino
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Early investor opportunity: Secure your stake in CryptoBet before public launch. Limited allocation available with projected 300% ROI in first year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Become an Investor
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  View Pitch Deck
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="relative z-10 animate-float bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Funding Progress</h3>
                  <p className="text-muted-foreground">Round 1: 78% Complete</p>
                </div>
                <div className="w-full h-4 bg-muted/50 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: "78%" }}></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">$3.9M</p>
                    <p className="text-xs text-muted-foreground">Raised</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">$5M</p>
                    <p className="text-xs text-muted-foreground">Goal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">22%</p>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Funding closes in</p>
                  <div className="flex justify-center gap-2">
                    <div className="bg-muted/50 rounded-md px-3 py-2">
                      <span className="text-xl font-mono font-bold">14</span>
                      <span className="text-xs block">days</span>
                    </div>
                    <div className="bg-muted/50 rounded-md px-3 py-2">
                      <span className="text-xl font-mono font-bold">06</span>
                      <span className="text-xs block">hours</span>
                    </div>
                    <div className="bg-muted/50 rounded-md px-3 py-2">
                      <span className="text-xl font-mono font-bold">32</span>
                      <span className="text-xs block">mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { 
              icon: <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />,
              value: "300%", 
              label: "Projected ROI" 
            },
            { 
              icon: <Coins className="h-6 w-6 text-primary mx-auto mb-2" />,
              value: "$25K", 
              label: "Min Investment" 
            },
            { 
              icon: <Users className="h-6 w-6 text-primary mx-auto mb-2" />,
              value: "86", 
              label: "Early Investors" 
            }
          ].map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
              {stat.icon}
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}