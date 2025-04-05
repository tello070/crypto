import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function CryptoSection() {
  const cryptoCoins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 65432.10,
      change: 2.4,
      volume: "$42.8B",
      marketCap: "$1.2T",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3521.45,
      change: -1.2,
      volume: "$21.3B",
      marketCap: "$420.5B",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 142.87,
      change: 5.7,
      volume: "$8.1B",
      marketCap: "$61.2B",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.svg"
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: 0.58,
      change: 1.3,
      volume: "$1.2B",
      marketCap: "$20.5B",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Cryptocurrencies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Invest with your preferred cryptocurrency. We support all major coins with instant deposits and withdrawals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptoCoins.map((coin) => (
            <Card key={coin.symbol} className="overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <img src={coin.logo} alt={coin.name} className="w-6 h-6" onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{coin.name}</CardTitle>
                      <CardDescription>{coin.symbol}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={coin.change >= 0 ? "default" : "destructive"} className="flex items-center">
                    {coin.change >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                    {Math.abs(coin.change)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="text-2xl font-bold">${coin.price.toLocaleString()}</div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Volume:</span>
                      <div>{coin.volume}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Market Cap:</span>
                      <div>{coin.marketCap}</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}