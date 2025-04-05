import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CryptoSection } from "@/components/CryptoSection";
import { InvestmentSection } from "@/components/InvestmentSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="crypto">
          <CryptoSection />
        </section>
        <section id="invest">
          <InvestmentSection />
        </section>
        <section id="roadmap">
          <RoadmapSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;