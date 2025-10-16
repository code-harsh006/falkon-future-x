"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import Image from "next/image";

export default function SmartHealthcareSolutions() {
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
                  🏥
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Healthcare Solutions</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Innovative healthcare solutions focused on quality and customer satisfaction.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our Smart Healthcare Solutions leverage cutting-edge technology to improve patient outcomes 
                  and operational efficiency. We provide telemedicine platforms, electronic health records systems, 
                  wearable health monitoring devices, and AI-powered diagnostic tools.
                </p>
                
                <p className="text-gray-700 mb-6">
                  These solutions enable healthcare providers to deliver personalized care, reduce costs, 
                  and improve accessibility while maintaining the highest standards of data security and 
                  patient privacy. Our integrated approach connects patients, providers, and health data 
                  in a seamless ecosystem that enhances the overall healthcare experience.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Telemedicine and remote consultation platforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Electronic health records (EHR) management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Wearable health monitoring and IoT integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>AI-powered diagnostic assistance tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Patient engagement and appointment scheduling</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Improved Access</h3>
                    <p className="text-gray-700">
                      Remote consultations and digital health tools increase access to care for underserved populations.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Enhanced Diagnostics</h3>
                    <p className="text-gray-700">
                      AI-assisted tools help identify health issues earlier and with greater accuracy.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Operational Efficiency</h3>
                    <p className="text-gray-700">
                      Automated workflows and digital records reduce administrative burden on healthcare staff.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Patient Engagement</h3>
                    <p className="text-gray-700">
                      Personalized health insights and easy access to medical records improve patient participation.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Transform Healthcare Delivery</h3>
                  <p className="text-gray-700 mb-4">
                    Contact us today to learn how our Smart Healthcare Solutions can improve patient outcomes 
                    while reducing costs and increasing operational efficiency.
                  </p>
                  <Link href="/#contact" className="btn-primary inline-block">
                    Schedule a Demo
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                🏥
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Healthcare Innovation</h3>
              <p className="text-gray-600">
                Advanced technology solutions for modern healthcare challenges and patient care.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/cyber-awareness-guidance" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Healthcare Data Security
                  </Link>
                </li>
                <li>
                  <Link href="/services/e-commerce" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Medical Supply E-Commerce
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