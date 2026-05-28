"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Coins, 
  MapPin, 
  Activity, 
  ShieldAlert,
  Phone,
  Mail,
  Globe,
  Database,
  Link as LinkIcon,
  RefreshCw,
  FileText,
  User,
  Plus,
  Play,
  CheckCircle2,
  Lock,
  Heart,
  HelpCircle,
  TrendingUp,
  Cpu
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useSendMessage } from "@/lib/useSendMessage";
import Logo from "@/components/ui/logo";
import HeroCarousel from "@/components/ui/hero-carousel";
import PlasticWasteCharts from "@/components/ui/plastic-waste-charts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InvestorControlCenter from "@/components/ui/InvestorControlCenter";

export default function Home() {
  const [investorMode, setInvestorMode] = useState(false);
  const { submitMessage } = useSendMessage();
  
  // Contact Form
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Video Observer
  const videoRef = useRef<HTMLIFrameElement>(null);
  
  // Interactive Closed Loop State
  const [activeStep, setActiveStep] = useState(0);

  // Mock Ledger Transactions
  const [ledgerTransactions, setLedgerTransactions] = useState([
    { tx: "0x3af8...92c1", brand: "Nestle India", quantity: "450 kg", type: "EPR Compliance", status: "Verified", date: "Just now" },
    { tx: "0x89e2...04b3", brand: "Hindustan Unilever", quantity: "1,200 kg", type: "EPR Compliance", status: "Verified", date: "3 mins ago" },
    { tx: "0xf12c...881a", brand: "Falkon carbon offset", quantity: "14.5 Tonnes CO2e", type: "Verra VM0044 Offset", status: "Verified", date: "12 mins ago" },
    { tx: "0x5a1b...290e", brand: "Coca-Cola India", quantity: "850 kg", type: "EPR Compliance", status: "Verified", date: "24 mins ago" },
    { tx: "0xd903...65e1", brand: "PepsiCo India", quantity: "670 kg", type: "EPR Compliance", status: "Verified", date: "1 hour ago" },
  ]);

  const [refreshingLedger, setRefreshingLedger] = useState(false);

  const triggerLedgerRefresh = () => {
    setRefreshingLedger(true);
    setTimeout(() => {
      const brands = ["Nestle India", "Hindustan Unilever", "Coca-Cola India", "PepsiCo India", "ITC Limited", "Parle Agro"];
      const qty = [250, 480, 720, 1100, 1500, 310];
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      const randomQty = qty[Math.floor(Math.random() * qty.length)] + " kg";
      
      const newTx = {
        tx: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        brand: randomBrand,
        quantity: randomQty,
        type: Math.random() > 0.4 ? "EPR Compliance" : "Verra VM0044 Offset",
        status: "Verified",
        date: "Just now"
      };

      setLedgerTransactions(prev => [newTx, ...prev.slice(0, 4)]);
      setRefreshingLedger(false);
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            const currentSrc = videoRef.current.src;
            if (!currentSrc.includes('autoplay=1')) {
              videoRef.current.src = currentSrc + '&autoplay=1&mute=1';
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitMessage(formData.name, formData.email, formData.message);
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ecoloop 9-step details
  const ecoloopSteps = [
    {
      title: "QR Code Issuance",
      icon: "🏷️",
      desc: "Brand owners register products on our SaaS portal. We issue unique serialized QR codes & Blockchain IDs for packaging tracking.",
      metric: "EPR Compliance",
      value: "Rs. 2-4 per item"
    },
    {
      title: "POS Scan Entry",
      icon: "🛒",
      desc: "Consumers scan the QR at the point of sale. This registers the package lifecycle entry, linking it to the consumer's wallet profile.",
      metric: "Verification",
      value: "99.9% Uptime"
    },
    {
      title: "Active Notifications",
      icon: "📱",
      desc: "The Falkan consumer app monitors consumption patterns and sends automated push reminders to sort and bag the plastic waste.",
      metric: "Engagement",
      value: "35% higher sorting"
    },
    {
      title: "IoT Smart Dustbin",
      icon: "🗑️",
      desc: "Households use our custom NB-IoT-powered Smart Dustbins. The bins auto-segregate wet vs dry waste using weight & light sensor metrics.",
      metric: "Hardware Level",
      value: "RFID Verification"
    },
    {
      title: "Justto Logistical Pickups",
      icon: "🚚",
      desc: "Delivery personnel on standard food routes collect the segregated plastic bags on their return trips, removing additional logistical overhead.",
      metric: "Collection Moat",
      value: "Zero new fleet cost"
    },
    {
      title: "Ledger Validation",
      icon: "🔗",
      desc: "Every pickup transaction and scanning node triggers smart contracts. Events are permanently inscribed on our trust ledger.",
      metric: "Data Trust",
      value: "Audit-ready nodes"
    },
    {
      title: "Certified Recyclers",
      icon: "♻️",
      desc: "Materials are routed to licensed partners who process the plastic waste into high-quality pellets. Batch outputs are logged to the block.",
      metric: "Circular Loop",
      value: "100% Traceability"
    },
    {
      title: "Carbon Offsetting",
      icon: "📊",
      desc: "Avoided carbon emissions are calculated according to Verra VM0044 specifications, converting tonnes of CO2e into tradeable offset tokens.",
      metric: "Offset Yield",
      value: "USD 8-15 per Tonne"
    },
    {
      title: "Reward Distribution",
      icon: "🪙",
      desc: "Proceeds from carbon credits & EPR subscriptions are split among households, delivery agents, certified recyclers, and brand owners.",
      metric: "Token Utility",
      value: "1 ESG = 1 INR"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 relative overflow-hidden">
      
      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Global Navbar */}
      <Navbar investorMode={investorMode} setInvestorMode={setInvestorMode} />

      {/* Hero Section */}
      <section id="hero" className="pt-36 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRE-SERIES A SEED ROUND OPEN</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                De-Carbonizing Waste, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Tokenizing Sustainability
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                Falkon Future X introduces **Falkan Ecoloop** — a decentralized circular economy system linking brands, consumers, and recyclers. We provide verifiable EPR compliance and tokenized carbon credits using Verra VM0044 methodologies.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl px-6 py-5 flex items-center gap-2 shadow-lg shadow-emerald-500/15"
                >
                  Join the Loop
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button 
                  onClick={() => setInvestorMode(!investorMode)}
                  variant="outline"
                  className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl px-6 py-5 font-semibold text-slate-700 dark:text-slate-350"
                >
                  {investorMode ? "Close Investor Deck" : "View Investor Deck Mode"}
                </Button>
              </div>

              {/* Highlight Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-850">
                {[
                  { value: "1.2M+", label: "Items Recycled" },
                  { value: "Rs. 1,200 Cr", label: "SOM Capacity" },
                  { value: "2.8M+", label: "Active Users" },
                  { value: "75+", label: "Cities Covered" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-xl font-bold text-slate-900 dark:text-white block">{stat.value}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Visual element (Carousel wrapped in premium card frame) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl pointer-events-none" />
              <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-3 shadow-xl hover:shadow-2xl transition-all duration-350 relative z-10">
                <HeroCarousel />
              </GlassCard>
            </div>

          </div>

        </div>
      </section>

      {/* Slide-out Investor deck mode panel */}
      {investorMode && (
        <section className="py-4 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InvestorControlCenter />
        </section>
      )}

      {/* Interactive Closed-Loop Visualizer */}
      <section id="solutions" className="section-py relative z-10 border-t border-slate-200/60 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Technical Core Architecture</span>
            <h2 className="section-title">The Decentralized Falkan Ecoloop</h2>
            <p className="section-subtitle mt-2 text-slate-500">
              An interactive walk through the 9 steps of our closed-loop plastic recycling and tracking ecosystem. Click any node to audit the data parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Step Selection Grid */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              {ecoloopSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left px-5 py-4 border rounded-2xl flex items-center gap-4 transition-all duration-200 ${
                    activeStep === idx
                      ? 'bg-white dark:bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/5 scale-102 font-semibold'
                      : 'bg-slate-100/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                    activeStep === idx ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-slate-400 block font-semibold">Step 0{idx + 1}</span>
                    <span className={`text-sm ${activeStep === idx ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                      {step.title}
                    </span>
                  </div>
                  {activeStep === idx && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
              ))}
            </div>

            {/* Detailed step panel display */}
            <div className="lg:col-span-7 flex">
              <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 flex flex-col justify-between flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-250 dark:border-slate-850 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{ecoloopSteps[activeStep].icon}</span>
                      <div>
                        <span className="text-xs text-slate-400 block uppercase font-bold tracking-widest">Process Node 0{activeStep + 1}</span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {ecoloopSteps[activeStep].title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      ACTIVE STATE
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                    {ecoloopSteps[activeStep].desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mb-0.5">Audit Category</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{ecoloopSteps[activeStep].metric}</span>
                    </div>
                    <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mb-0.5">Target Metric</span>
                      <span className="text-sm font-bold text-emerald-500">{ecoloopSteps[activeStep].value}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-250 dark:border-slate-850 mt-6 flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Verified by CPCB / NGT Solid Waste Regulations
                  </span>
                  <button 
                    onClick={() => setActiveStep((prev) => (prev + 1) % ecoloopSteps.length)}
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                  >
                    Next node
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            </div>

          </div>

        </div>
      </section>

      {/* Carbon Offsets & EPR Mock Blockchain Ledger Explorer */}
      <section className="section-py bg-slate-950 text-slate-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2">
                <Database className="w-3 h-3" />
                <span>Decentralized Verification layer</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                Ecoloop Carbon & EPR Ledger
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Transactions, collection payloads, and Carbon offset credits are logged cryptographically to enable institutional auditing.
              </p>
            </div>

            <Button
              onClick={triggerLedgerRefresh}
              disabled={refreshingLedger}
              size="sm"
              className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 flex items-center gap-2 rounded-xl"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshingLedger ? 'animate-spin' : ''}`} />
              <span>Refresh Ledger</span>
            </Button>
          </div>

          {/* Block Table Explorer */}
          <div className="border border-slate-900 rounded-3xl bg-slate-900/40 backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-850 text-slate-500 uppercase tracking-widest font-semibold">
                    <th className="py-4 px-6">Transaction Hash</th>
                    <th className="py-4 px-6">Entity / Offset Partner</th>
                    <th className="py-4 px-6 text-right">Offset Metric</th>
                    <th className="py-4 px-6">Methodology</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Validated Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-350">
                  {ledgerTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-emerald-400 flex items-center gap-1.5">
                        <LinkIcon className="w-3 h-3 text-slate-600" />
                        {tx.tx}
                      </td>
                      <td className="py-4 px-6 font-semibold text-white">{tx.brand}</td>
                      <td className="py-4 px-6 text-right font-bold text-white">{tx.quantity}</td>
                      <td className="py-4 px-6 text-slate-400">{tx.type}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 rounded-md font-semibold">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-medium">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Average Offset Yield: <strong className="text-white">USD 11.5 / Tonne</strong></span>
              <span>•</span>
              <span>Blockchain: <strong className="text-white">Polygon Layer-2</strong></span>
              <span>•</span>
              <span>Ledger Node Count: <strong className="text-white">1,402 Active Validator Nodes</strong></span>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-py relative z-10 bg-slate-100/50 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Core Ecosystem Features</span>
            <h2 className="section-title">Engineered for Waste Resolution</h2>
            <p className="section-subtitle mt-2 text-slate-500">
              Powerful technological features delivering actionable recycling workflows for consumers and brand partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📷", title: "AI-Powered Scanning", desc: "Computer vision scan instantly resolves polymer grades, providing detailed recycling instructions." },
              { icon: "📍", title: "Smart Geolocation", desc: "Real-time location indicators route consumers to neighborhood smart collection sites." },
              { icon: "🪙", title: "ESG Token Rewards", desc: "Redeemable tokens paid directly to consumer wallets for verified recycling inputs." },
              { icon: "📈", title: "ESG Impact Metrics", desc: "Interactive personal & corporate dashboards auditing carbon offsets & diverted landfill tonnes." }
            ].map((feat, i) => (
              <div key={i} className="glass-card-premium glass-hover-effect p-6 flex flex-col justify-between h-64 border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl mb-4">
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
                
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  Active in pilot
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About Section & Video */}
      <section id="about" className="section-py relative z-10 border-t border-slate-200/60 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* About Text */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Our Mission & Mandates</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Resolving Urban Landfill Dependency
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                Falkon Future X works with municipalities (B2G) and enterprises (B2B) to divert plastic away from toxic landfill sites. By converting landfill waste streams into certified carbon credits, we create a self-funding recycling loop.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: "♻️", title: "Recycle Protocol" },
                  { icon: "👁️", title: "Civic Awareness" },
                  { icon: "⚙️", title: "Ecosystem Innovation" }
                ].map((val, idx) => (
                  <div key={idx} className="bg-slate-100/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl text-center">
                    <span className="text-2xl block mb-1">{val.icon}</span>
                    <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">{val.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl pointer-events-none" />
              <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-3 shadow-xl hover:shadow-2xl transition-all duration-350 relative z-10">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                  <iframe
                    ref={videoRef}
                    src="https://www.youtube.com/embed/51zpkl-VRiU?rel=0&modestbranding=1&showinfo=0"
                    title="Plastic Waste Crisis - Falkon Future X"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 pt-6 text-left">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Plastic Waste Crisis (India)</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    India produces over 9.4 million tonnes of plastic annually, with less than 10% being recycled. Falkon Future X provides technology to scale these metrics.
                  </p>
                </div>
              </GlassCard>
            </div>

          </div>

        </div>
      </section>

      {/* Industrial Analytics Section */}
      <PlasticWasteCharts />

      {/* Corporate Ecosystem Services (Ventures of Falkon Future X) */}
      <section id="services" className="section-py relative z-10 border-t border-slate-200/60 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Corporate Ventures</span>
              <h2 className="section-title">Ecosystem Ventures & Services</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                Falkon Future X operates strategic business divisions addressing critical resource challenges, environmental compliance, and secure enterprise software.
              </p>
            </div>
            
            <Link 
              href="/services" 
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              View all services details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "water-bound-digises-solution", icon: "💧", title: "Water Resource Management", desc: "IoT water audits, sewage block indicators, and digital sensors optimizing city municipal reserves." },
              { id: "smart-waste-management-system", icon: "🗑️", title: "Smart Waste Bins", desc: "Sensors checking fill levels, auto sorting algorithms, and RFID bags managing municipal sanitation." },
              { id: "cyber-awareness-guidance", icon: "🔒", title: "Cyber Security Consultancy", desc: "Expert threat audits, phishing simulations, compliance standards, and corporate defensive training." },
              { id: "e-commerce", icon: "🛒", title: "E-Commerce Frameworks", desc: "End-to-end shopping platforms with automated logistics, secure payments, and ESG reward integration." },
              { id: "smart-healthcare-solutions", icon: "🏥", title: "Smart Health Technology", desc: "Telemedicine software systems, encrypted electronic health records, and AI-enabled diagnostic metrics." },
              { id: "new-renewable-energy", icon: "☀️", title: "Renewable Energy Audits", desc: "Transition planning for commercial buildings, solar layout designs, and municipal grid audits." }
            ].map((serv, i) => (
              <Link 
                key={serv.id} 
                href={`/services/${serv.id}`}
                className="glass-card-premium glass-hover-effect p-6 flex flex-col justify-between h-56 border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300 block text-left"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl mb-4">
                    {serv.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{serv.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{serv.desc}</p>
                </div>
                
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  Learn More
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* Advisory & Executive Team Panel */}
      <section id="team" className="section-py relative z-10 border-t border-slate-200/60 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Executive Leadership & Advisory</span>
            <h2 className="section-title">Our Directors & Advisors</h2>
            <p className="section-subtitle mt-2 text-slate-500">
              Backed by senior environmental researchers, tech leaders, and former executive government administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Mr. Desh Premi", role: "CEO & Founder", desc: "Environmental Scientist with 15+ years leading solid waste solutions.", img: "/founder.jpg" },
              { name: "Jadav Madhav", role: "CTO & Co-Founder", desc: "Tech architect building IoT sensors and ledger smart contracts.", img: "/co-founder.jpg" },
              { name: "Amit Kumar", role: "Head of Operations", desc: "Logistics specialist managing last-mile collection pipelines.", img: "/head-of-operations.jpg" },
              { name: "Sunil K. Gautam IPS", role: "Board Advisor", desc: "1989-batch AGMUT IPS Officer. Former Special Commissioner of Delhi Police.", img: "/mentore.jpeg" },
              { name: "Dr. Mansaf Alam", role: "Academic Advisor", desc: "Professor of CS, Jamia Millia Islamia. Young Faculty Fellow, MeitY Govt of India.", img: "/mentor_2.jpeg" }
            ].map((member, i) => (
              <div key={i} className="glass-card-premium border-slate-200/50 dark:border-slate-800/50 overflow-hidden group">
                <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold block">{member.role}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{member.name}</h3>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 text-left min-h-24">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-py relative z-10 border-t border-slate-200/60 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Address Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Join the Circular Economy</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Get in Touch
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-450 mt-2">
                  Reach out to discuss brand partner EPR compliance integrations, investment opportunities, or municipal pilot programs.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-350">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Headquarters</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      House No. 293, Second Floor, Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi – 110030, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-350">
                    <Mail className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Email Address</h4>
                    <a href="mailto:info@falkonfuturex.com" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline block mt-1">
                      info@falkonfuturex.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-350">
                    <Globe className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Corporate Web Portal</h4>
                    <a href="https://www.falkonfuturex.com" target="_blank" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline block mt-1">
                      www.falkonfuturex.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email form */}
            <div className="lg:col-span-7">
              <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 p-8 rounded-3xl shadow-lg relative">
                {submitSuccess && (
                  <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Your inquiry payload has been sent successfully. We will follow up shortly.</span>
                  </div>
                )}
                
                <form className="space-y-5 text-left" onSubmit={handleSubmit}>
                  <div>
                    <label className="premium-label">Corporate Contact Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Director of Sustainability"
                      className="premium-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="premium-label">Corporate Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. compliance@yourbrand.com"
                      className="premium-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="premium-label">Inquiry Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your inquiry (e.g. EPR compliance offsets pricing, Pilot Smart Bin installation counts...)"
                      rows={5}
                      className="premium-input"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl py-6 flex justify-center items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Transmitting Inbound...' : 'Transmit Inquiry'}
                  </Button>
                </form>
              </GlassCard>
            </div>

          </div>

        </div>
      </section>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
