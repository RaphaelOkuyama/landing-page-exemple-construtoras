import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { NumerosSection } from "@/components/NumerosSection";
import { ConstrucaoSection } from "@/components/ConstrucaoSection";
import { DiferenciaisSection } from "@/components/DiferenciaisSection";
import { ObrasSection } from "@/components/ObrasSection";
import { ProcessoSection } from "@/components/ProcessoSection";
import { DepoimentosSection } from "@/components/DepoimentosSection";
import { SobreSection } from "@/components/SobreSection";
import { FaqSection } from "@/components/FaqSection";
import { ContatoSection } from "@/components/ContatoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <NumerosSection />
        <DiferenciaisSection />
        <ConstrucaoSection />
        <ObrasSection />
        <ProcessoSection />
        <DepoimentosSection />
        <SobreSection />
        <FaqSection />
        <ContatoSection />
      </main>
      <Footer />
    </>
  );
}
