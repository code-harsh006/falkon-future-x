"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function FoodDelivery() {
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
                  🍽️
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Food Delivery</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Efficient and sustainable food delivery services connecting consumers with quality providers.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our Food Delivery service connects consumers with local restaurants through an efficient 
                  and sustainable platform. We optimize delivery routes using AI algorithms, provide 
                  real-time tracking, and offer eco-friendly packaging options.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Our system supports multiple payment methods, customer reviews, and loyalty programs. 
                  We prioritize partnerships with restaurants that source ingredients sustainably and 
                  maintain high quality standards. With our technology, customers can enjoy convenient 
                  food delivery while supporting local businesses and environmentally responsible practices.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>AI-powered route optimization for faster deliveries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Real-time order tracking and notifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Eco-friendly packaging and sustainable practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Integrated customer review and rating system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Flexible payment options including contactless payments</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainability Focus</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Carbon Neutral Delivery</h3>
                    <p className="text-gray-700">
                      Electric vehicle fleet and carbon offset programs to minimize environmental impact.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Local Sourcing</h3>
                    <p className="text-gray-700">
                      Partnership with restaurants that source ingredients locally to reduce food miles.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Waste Reduction</h3>
                    <p className="text-gray-700">
                      Optimized packaging and food rescue programs to minimize waste throughout the supply chain.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Community Support</h3>
                    <p className="text-gray-700">
                      Dedicated platform features to promote and support local restaurants and food businesses.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Join Our Food Delivery Network</h3>
                  <p className="text-gray-700 mb-4">
                    Partner with us to reach more customers or order from local restaurants committed to quality and sustainability.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/#contact" className="btn-primary">
                      Become a Partner
                    </Link>
                    <Link href="/#contact" className="btn-outline">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                🚚
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery in Progress</h3>
              <p className="text-gray-600">
                Our efficient delivery network ensures your food arrives fresh and on time.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/e-commerce" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    E-Commerce Integration
                  </Link>
                </li>
                <li>
                  <Link href="/services/smart-healthcare-solutions" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Nutrition & Health Services
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