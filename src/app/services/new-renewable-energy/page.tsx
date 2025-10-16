"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function NewRenewableEnergy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/services" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Services
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mr-4">
                  ☀️
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">New Renewable Energy</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Sustainable energy solutions harnessing the power of renewable resources for a cleaner future.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our New Renewable Energy solutions focus on implementing cutting-edge sustainable energy 
                  technologies including solar, wind, and emerging green technologies. We provide 
                  comprehensive energy audits, system design and installation, and ongoing monitoring services.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Our approach helps organizations reduce carbon footprints, lower energy costs, and achieve 
                  sustainability goals through customized renewable energy systems that integrate seamlessly 
                  with existing infrastructure. With our expertise in the latest renewable technologies, 
                  we design solutions that maximize energy efficiency while minimizing environmental impact.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Comprehensive energy audits and assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Solar panel system design and installation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Wind energy solutions for commercial applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Energy storage systems and battery integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Smart grid integration and energy management</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Solar Power</h3>
                    <p className="text-gray-700">
                      Advanced photovoltaic systems with high-efficiency panels and smart inverters for maximum energy production.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Wind Energy</h3>
                    <p className="text-gray-700">
                      Commercial-scale wind turbines with predictive maintenance and performance optimization.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Energy Storage</h3>
                    <p className="text-gray-700">
                      Battery systems for energy storage and grid stability with intelligent management software.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Hydrogen Solutions</h3>
                    <p className="text-gray-700">
                      Green hydrogen production and storage technologies for industrial applications.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Transition to Clean Energy</h3>
                  <p className="text-gray-700 mb-4">
                    Contact us today to schedule an energy audit and discover how our renewable energy solutions 
                    can reduce your carbon footprint while saving on energy costs.
                  </p>
                  <Link href="/#contact" className="btn-primary inline-block">
                    Request Energy Audit
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                ☀️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Solar Installation</h3>
              <p className="text-gray-600">
                Professional installation of solar panel systems for residential and commercial properties.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/water-bound-digises-solution" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Water-Energy Nexus Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services/smart-waste-management-system" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Waste-to-Energy Systems
                  </Link>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}