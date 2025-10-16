"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import Image from "next/image";

export default function SmartWasteManagementSystem() {
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
                  🗑️
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Waste Management System</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Cutting-edge technology for intelligent waste management and monitoring systems with new tech.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our Smart Waste Management System revolutionizes how organizations handle waste through 
                  IoT-enabled smart bins, route optimization algorithms, and real-time monitoring. 
                  The system includes sensor-equipped containers that alert collection teams when full, 
                  AI-powered sorting mechanisms, and analytics dashboards that provide insights into 
                  waste generation patterns.
                </p>
                
                <p className="text-gray-700 mb-6">
                  This technology significantly reduces operational costs while improving recycling rates 
                  and environmental impact. With our solution, municipalities and businesses can optimize 
                  collection routes, reduce fuel consumption, and ensure timely waste pickup, all while 
                  contributing to a cleaner environment.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>IoT-enabled smart bins with fill-level sensors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>AI-powered waste sorting technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Route optimization for collection vehicles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Real-time monitoring dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Predictive analytics for waste generation patterns</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Cost Efficiency</h3>
                    <p className="text-gray-700">
                      Reduce operational costs by up to 40% through optimized collection routes and schedules.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Environmental Impact</h3>
                    <p className="text-gray-700">
                      Increase recycling rates and reduce landfill usage with intelligent sorting systems.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Operational Insights</h3>
                    <p className="text-gray-700">
                      Gain valuable data on waste generation patterns for better planning and resource allocation.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Public Health</h3>
                    <p className="text-gray-700">
                      Maintain cleaner public spaces with timely waste collection and overflow prevention.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Transform Your Waste Management Today</h3>
                  <p className="text-gray-700 mb-4">
                    Contact us to learn how our Smart Waste Management System can help your organization 
                    operate more efficiently while contributing to environmental sustainability.
                  </p>
                  <Link href="/#contact" className="btn-primary inline-block">
                    Request a Demo
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                🗑️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Bins Network</h3>
              <p className="text-gray-600">
                Our IoT-enabled bins provide real-time data on fill levels and optimize collection schedules.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/water-bound-digises-solution" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Water Bound Digises Solution
                  </Link>
                </li>
                <li>
                  <Link href="/services/new-renewable-energy" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    New Renewable Energy
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