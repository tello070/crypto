import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export function InvestmentSection() {
  const plans = [
    {
      name: "Angel Investor",
      price: "$25,000",
      description: "Entry-level investment package",
      features: [
        "0.5% revenue share",
        "25,000 CBT tokens",
        "Quarterly distributions",
        "Investor dashboard access",
        "Early platform access"
      ],
      highlighted: false,
      tokenBonus: "0%",
      roi: "200-250%"
    },
    {
      name: "Venture Partner",
      price: "$100,000",
      description: "Most popular investment tier",
      features: [
        "2.5% revenue share",
        "120,000 CBT tokens (20% bonus)",
        "Monthly distributions",
        "Investor dashboard access",
        "Early platform access",
        "Quarterly strategy calls",
        "Name in casino 'Founders Wall'"
      ],
      highlighted: true,
      tokenBonus: "20%",
      roi: "250-320%"
    },
    {
      name: "Founding Member",
      price: "$500,000",
      description: "Strategic partner allocation",
      features: [
        "15% revenue share",
        "650,000 CBT tokens (30% bonus)",
        "Weekly distributions",
        "Investor dashboard access",
        "Early platform access",
        "Monthly strategy calls",
        "Advisory board position",
        "Custom branded game"
      ],
      highlighted: false,
      tokenBonus: "30%",
      roi: "300-400%"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-semibold text-primary">FUNDING ROUNDS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure Your Investment Position</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your investment tier and become part of the next generation crypto casino. Only 150 positions available in this funding round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                plan.highlighted 
                  ? 'border-primary shadow-lg shadow-primary/20' 
                  : 'border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {plan.name}
                  {plan.highlighted && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> investment</span>
                </div>
                <div className="flex justify-between mb-6 text-sm">
                  <div className="bg-muted/50 rounded-md px-3 py-2">
                    <span className="block text-muted-foreground">Token Bonus</span>
                    <span className="font-bold text-primary">{plan.tokenBonus}</span>
                  </div>
                  <div className="bg-muted/50 rounded-md px-3 py-2">
                    <span className="block text-muted-foreground">Projected ROI</span>
                    <span className="font-bold text-primary">{plan.roi}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  Reserve Position
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">Need a custom investment package? Contact our investor relations team</p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Schedule a Call
          </Button>
        </div>
      </div>
    </section>
  );
}