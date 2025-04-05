import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoadmapSection } from "@/components/RoadmapSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Roadmap() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 mb-8">
          <Link to="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Roadmap</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our detailed development timeline and milestone achievements for the CryptoBet platform.
          </p>
        </div>
        <RoadmapSection />
        
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Future Expansion Plans</h2>
            <p className="text-muted-foreground mb-6">
              Beyond our current roadmap, CryptoBet has ambitious plans for 2025 and beyond:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Metaverse Casino Integration</p>
                  <p className="text-sm text-muted-foreground">
                    Creating immersive VR/AR casino experiences in popular metaverse platforms.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">DAO Governance Implementation</p>
                  <p className="text-sm text-muted-foreground">
                    Transitioning to a fully decentralized governance model for platform decisions.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Cross-Chain Expansion</p>
                  <p className="text-sm text-muted-foreground">
                    Supporting additional blockchain networks to increase accessibility and reduce fees.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">4</span>
                </div>
                <div>
                  <p className="font-medium">Branded Casino Games</p>
                  <p className="text-sm text-muted-foreground">
                    Partnerships with major brands and celebrities for exclusive themed games.
                  </p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 flex justify-center">
              <Link to="/invest">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Join Our Investment Round
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}