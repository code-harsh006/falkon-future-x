import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import TechnologyLayers from "@/components/sections/TechnologyLayers";
import Audiences from "@/components/sections/Audiences";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import PlasticWasteCharts from "@/components/ui/plastic-waste-charts";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TechnologyLayers />
        <Audiences />
        <About />
        <HowItWorks />
        <PlasticWasteCharts />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
