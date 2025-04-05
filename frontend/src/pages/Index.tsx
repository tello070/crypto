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
        <HeroSection />
        <FeaturesSection />
        <CryptoSection />
        <InvestmentSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;