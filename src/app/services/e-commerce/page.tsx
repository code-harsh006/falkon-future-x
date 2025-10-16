"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function ECommerce() {
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
                  🛒
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">E-Commerce</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Complete e-commerce solutions to grow your business in the digital marketplace.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our E-Commerce solutions provide end-to-end digital storefront capabilities, 
                  from platform development to payment integration and logistics management. 
                  We specialize in creating seamless shopping experiences with personalized recommendations, 
                  secure payment processing, inventory management, and analytics tools.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Our platform supports multiple sales channels, mobile optimization, and integrates 
                  with existing business systems to streamline operations and maximize revenue. 
                  Whether you're launching a new online store or upgrading an existing platform, 
                  our solutions are designed to scale with your business needs while providing 
                  exceptional user experiences for your customers.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Custom e-commerce platform development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Secure payment gateway integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Inventory and order management systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Mobile-responsive design and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Advanced analytics and reporting dashboard</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Multi-Channel Selling</h3>
                    <p className="text-gray-700">
                      Seamlessly integrate with major marketplaces like Amazon, eBay, and social commerce platforms.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Personalization Engine</h3>
                    <p className="text-gray-700">
                      AI-powered product recommendations and personalized shopping experiences.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Security & Compliance</h3>
                    <p className="text-gray-700">
                      PCI-DSS compliant payment processing and GDPR-compliant data handling.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Scalability</h3>
                    <p className="text-gray-700">
                      Cloud-based infrastructure that scales with your business growth.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Launch Your Online Store</h3>
                  <p className="text-gray-700 mb-4">
                    Contact us today to discuss how our e-commerce solutions can help you establish 
                    or enhance your online presence and drive business growth.
                  </p>
                  <Link href="/#contact" className="btn-primary inline-block">
                    Get Started
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                🛒
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Marketplace</h3>
              <p className="text-gray-600">
                Modern e-commerce platform with seamless user experience and secure transactions.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/cyber-awareness-guidance" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Cyber Security for E-Commerce
                  </Link>
                </li>
                <li>
                  <Link href="/services/food-delivery" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Food Delivery Integration
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