"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function WaterBoundDigisesSolution() {
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
                  💧
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Water Bound Digises Solution</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Advanced water management and digital solutions for efficient resource utilization.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our Water Bound Digises Solution provides comprehensive water management through digital technologies. 
                  We integrate IoT sensors, real-time monitoring systems, and predictive analytics to optimize water usage 
                  in industrial and municipal environments.
                </p>
                
                <p className="text-gray-700 mb-6">
                  This solution helps organizations reduce water waste, improve efficiency, and meet sustainability goals 
                  through data-driven insights and automated control systems. With real-time monitoring capabilities, 
                  our system can detect leaks, monitor quality parameters, and automatically adjust distribution based on demand.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>IoT-enabled sensors for real-time water monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Predictive analytics for demand forecasting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Automated control systems for optimal distribution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Leak detection and prevention mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Comprehensive reporting and dashboard analytics</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Cost Reduction</h3>
                    <p className="text-gray-700">
                      Reduce water waste by up to 30% through intelligent monitoring and control systems.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Sustainability</h3>
                    <p className="text-gray-700">
                      Meet environmental regulations and sustainability goals with comprehensive water management.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Operational Efficiency</h3>
                    <p className="text-gray-700">
                      Automate routine tasks and optimize resource allocation with AI-driven insights.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Risk Mitigation</h3>
                    <p className="text-gray-700">
                      Prevent costly leaks and water damage with early detection systems.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Transform Your Water Management?</h3>
                  <p className="text-gray-700 mb-4">
                    Contact us today to learn how our Water Bound Digises Solution can help your organization 
                    achieve more efficient and sustainable water usage.
                  </p>
                  <Link href="/#contact" className="btn-primary inline-block">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                💧
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Water Management System</h3>
              <p className="text-gray-600">
                Our advanced monitoring and control systems ensure optimal water usage and distribution.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/smart-waste-management-system" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Smart Waste Management System
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