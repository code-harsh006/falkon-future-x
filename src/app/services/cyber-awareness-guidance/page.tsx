"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function CyberAwarenessGuidance() {
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
                  🔒
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Cyber Awareness Guidance & Consultancy</h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8">
                Expert consultancy and training programs to enhance cybersecurity awareness.
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">
                  Our Cyber Awareness Guidance & Consultancy service provides comprehensive cybersecurity 
                  training and strategic guidance to protect your organization's digital assets. 
                  We offer tailored workshops, simulation exercises, and ongoing consultancy to build 
                  a strong security culture within your team.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Our services include threat assessment, policy development, incident response planning, 
                  and continuous monitoring to ensure your organization stays ahead of evolving cyber threats. 
                  With increasing cyber attacks targeting businesses of all sizes, our expert team helps you 
                  identify vulnerabilities and implement robust security measures to protect sensitive data 
                  and maintain business continuity.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Customized cybersecurity training programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Phishing simulation and social engineering testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Comprehensive threat assessment and vulnerability analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Incident response planning and disaster recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Ongoing security monitoring and consultancy</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Security Fundamentals</h3>
                    <p className="text-gray-700">
                      Core concepts of cybersecurity, password security, and safe browsing practices.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Social Engineering</h3>
                    <p className="text-gray-700">
                      Recognizing and defending against phishing, pretexting, and other manipulation tactics.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Device Security</h3>
                    <p className="text-gray-700">
                      Securing mobile devices, laptops, and other endpoints against common threats.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Data Protection</h3>
                    <p className="text-gray-700">
                      Best practices for handling sensitive information and compliance with data protection regulations.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Strengthen Your Cyber Defenses</h3>
                  <p className="text-gray-700 mb-4">
                    Contact us today to schedule a cybersecurity assessment and learn how our training programs 
                    can protect your organization from evolving digital threats.
                  </p>
                  <Link href="/#contact" className="btn-primary inline-block">
                    Schedule Assessment
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div>
            <GlassCard className="p-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-4">
                🔒
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cybersecurity Workshop</h3>
              <p className="text-gray-600">
                Interactive training sessions to build awareness and defensive skills against cyber threats.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/e-commerce" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    E-Commerce Security
                  </Link>
                </li>
                <li>
                  <Link href="/services/smart-healthcare-solutions" className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-2">→</span>
                    Healthcare Data Protection
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