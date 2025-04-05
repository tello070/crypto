import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CryptoSection() {
  const cryptoCoins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 65432.10,
      change: 2.4,
      volume: "$42.8B",
      marketCap: "$1.2T",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
      allocation: "40%"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3521.45,
      change: -1.2,
      volume: "$21.3B",
      marketCap: "$420.5B",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      allocation: "30%"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 142.87,
      change: 5.7,
      volume: "$8.1B",
      marketCap: "$61.2B",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
      allocation: "15%"
    },
    {
      name: "CryptoBet",
      symbol: "CBT",
      price: 0.00,
      change: 0,
      volume: "Pre-launch",
      marketCap: "TBD",
      logo: "/placeholder.svg",
      allocation: "15%",
      isToken: true
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-semibold text-primary">TOKENOMICS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Token & Supported Currencies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform will operate on our native CBT token while supporting major cryptocurrencies for deposits and withdrawals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptoCoins.map((coin) => (
            <Card key={coin.symbol} className={`overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${coin.isToken ? 'border-primary' : 'border-border'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${coin.isToken ? 'bg-primary/20' : 'bg-muted'}`}>
                      <img src={coin.logo} alt={coin.name} className="w-6 h-6" onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <CardTitle className="text-lg">{coin.name}</CardTitle>
                        {coin.isToken && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">
                                  CryptoBet Token (CBT) is our native utility token that powers the platform. 
                                  Early investors receive tokens at pre-launch prices.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <CardDescription>{coin.symbol}</CardDescription>
                    </div>
                  </div>
                  {!coin.isToken ? (
                    <Badge variant={coin.change >= 0 ? "default" : "destructive"} className="flex items-center">
                      {coin.change >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                      {Math.abs(coin.change)}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-primary text-primary">
                      Pre-launch
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="text-2xl font-bold">
                    {coin.isToken ? "TBD" : `$${coin.price.toLocaleString()}`}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Volume:</span>
                      <div>{coin.volume}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Platform Allocation:</span>
                      <div>{coin.allocation}</div>
                    </div>
                  </div>
                </div>
                <Button 
                  variant={coin.isToken ? "default" : "outline"} 
                  className={`w-full mt-4 ${coin.isToken ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                >
                  {coin.isToken ? "Learn About CBT" : "Invest with " + coin.symbol}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">CBT Token Utility</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Platform Currency</p>
                    <p className="text-sm text-muted-foreground">Used for all transactions within the casino</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Staking Rewards</p>
                    <p className="text-sm text-muted-foreground">Earn passive income by staking tokens</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Governance Rights</p>
                    <p className="text-sm text-muted-foreground">Vote on platform features and development</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-medium">VIP Benefits</p>
                    <p className="text-sm text-muted-foreground">Exclusive games, lower fees, and special promotions</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-muted/30 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4">Token Distribution</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Investors</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Platform Reserve</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Team & Advisors</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Marketing & Partnerships</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Liquidity Pool</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}