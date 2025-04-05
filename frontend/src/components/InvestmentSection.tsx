import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function InvestmentSection() {
  const plans = [
    {
      name: "Starter",
      price: "$500",
      description: "Perfect for new investors",
      features: [
        "Access to basic casino games",
        "5% monthly returns",
        "Weekly payouts",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Growth",
      price: "$2,500",
      description: "Our most popular plan",
      features: [
        "Access to all casino games",
        "8% monthly returns",
        "Daily payouts",
        "Priority support",
        "Exclusive tournaments"
      ],
      highlighted: true
    },
    {
      name: "Whale",
      price: "$10,000",
      description: "For serious investors",
      features: [
        "VIP access to all features",
        "12% monthly returns",
        "Instant payouts",
        "24/7 dedicated support",
        "Exclusive tournaments",
        "Profit sharing"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the investment plan that suits your goals. Start small or go all in.
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
                  <Badge className="rounded-none rounded-bl-lg">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> minimum</span>
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
                  Start Investing
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}