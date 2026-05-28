"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Search, Inbox, ShieldAlert, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const [investorMode, setInvestorMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const services = [
    {
      id: "water-bound-digises-solution",
      title: "Waterborne Disease & Resource Solution",
      description: "Advanced water management and digital solutions for efficient resource utilization.",
      icon: "💧",
      category: "environment",
      details: "Our Water Bound Digises Solution provides comprehensive water management through digital technologies. We integrate IoT sensors, real-time monitoring systems, and predictive analytics to optimize water usage in industrial and municipal environments."
    },
    {
      id: "smart-waste-management-system",
      title: "Smart Waste Management Bins",
      description: "Cutting-edge technology for intelligent waste management and monitoring systems with new tech.",
      icon: "🗑️",
      category: "environment",
      details: "Our Smart Waste Management System revolutionizes how organizations handle waste through IoT-enabled smart bins, route optimization algorithms, and real-time monitoring. The system includes sensor-equipped containers that alert collection teams when full."
    },
    {
      id: "cyber-awareness-guidance",
      title: "Cyber Awareness Guidance & Consultancy",
      description: "Expert consultancy and training programs to enhance cybersecurity awareness.",
      icon: "🔒",
      category: "enterprise",
      details: "Our Cyber Awareness Guidance & Consultancy service provides comprehensive cybersecurity training and strategic guidance to protect your organization's digital assets. We offer tailored workshops, threat assessments, and policy development."
    },
    {
      id: "e-commerce",
      title: "E-Commerce Framework Integrations",
      description: "Complete e-commerce solutions to grow your business in the digital marketplace.",
      icon: "🛒",
      category: "software",
      details: "Our E-Commerce solutions provide end-to-end digital storefront capabilities, from platform development to payment integration and logistics management, helping you scale operations and maximize revenue streams."
    },
    {
      id: "smart-healthcare-solutions",
      title: "Smart Healthcare Solutions",
      description: "Innovative healthcare solutions focused on quality and customer satisfaction.",
      icon: "🏥",
      category: "software",
      details: "Our Smart Healthcare Solutions leverage cutting-edge technology to improve patient outcomes and operational efficiency. We provide telemedicine platforms, electronic health records systems, and wearable monitoring integration."
    },
    {
      id: "food-delivery",
      title: "Sustainable Food Delivery Systems",
      description: "Efficient and sustainable food delivery services connecting consumers with quality providers.",
      icon: "🍽️",
      category: "logistics",
      details: "Our Food Delivery service connects consumers with local restaurants through an efficient and sustainable platform. We optimize delivery routes using AI algorithms and prioritize partner sustainability metrics."
    },
    {
      id: "new-renewable-energy",
      title: "New Renewable Energy Auditing",
      description: "Sustainable energy solutions harnessing the power of renewable resources for a cleaner future.",
      icon: "☀️",
      category: "environment",
      details: "Our New Renewable Energy solutions focus on implementing cutting-edge sustainable energy technologies including solar, wind, and emerging green technologies, designed to integrate seamlessly with existing grid systems."
    }
  ];

  const categories = [
    { id: "all", label: "All Ventures" },
    { id: "environment", label: "Environmental & ESG" },
    { id: "enterprise", label: "Enterprise Security" },
    { id: "software", label: "Software & Retail" },
    { id: "logistics", label: "Logistics" }
  ];

  // Filtering
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-205 relative overflow-hidden">
      
      {/* Decorative grids */}
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar investorMode={investorMode} setInvestorMode={setInvestorMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 relative z-10 text-left">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-semibold">
          <Link href="/" className="hover:text-slate-600 dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-500">Services</span>
        </div>

        {/* Title Block */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Falkon Corporate Ventures</span>
          </div>
          <h1 className="section-title">Ecosystem Services</h1>
          <p className="section-subtitle mt-2 text-slate-500 max-w-3xl">
            Explore our specialized divisions dedicated to solving complex infrastructure, resource allocation, and digital security challenges.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-850">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/55 dark:border-slate-800/55">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat.id
                    ? "bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-800/50"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-input pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs w-full"
            />
          </div>

        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <GlassCard 
                key={service.id}
                className="overflow-hidden transition-all duration-350 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-2xl shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{service.description}</p>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-850 mt-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                  
                  <Link 
                    href={`/services/${service.id}`}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-100/30 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">No services found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search filters or active categorization.</p>
          </div>
        )}

        {/* Global Service Intake Form block */}
        <div className="mt-16 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Request Customized Advisory Assessment</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Partner with Falkon Future X. We perform comprehensive technical integration audits for e-commerce, smart waste, cyber defenses, and renewable grids.
            </p>
          </div>
          <Link href="/#contact" className="btn-premium-primary whitespace-nowrap text-xs">
            Connect with Specialist
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}