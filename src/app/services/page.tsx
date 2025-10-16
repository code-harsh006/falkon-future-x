"use client";

import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "water-bound-digises-solution",
      title: "Water Bound Digises Solution",
      description: "Advanced water management and digital solutions for efficient resource utilization.",
      icon: "💧",
      details: "Our Water Bound Digises Solution provides comprehensive water management through digital technologies. We integrate IoT sensors, real-time monitoring systems, and predictive analytics to optimize water usage in industrial and municipal environments. This solution helps organizations reduce water waste, improve efficiency, and meet sustainability goals through data-driven insights and automated control systems."
    },
    {
      id: "smart-waste-management-system",
      title: "Smart Waste Management System",
      description: "Cutting-edge technology for intelligent waste management and monitoring systems with new tech.",
      icon: "🗑️",
      details: "Our Smart Waste Management System revolutionizes how organizations handle waste through IoT-enabled smart bins, route optimization algorithms, and real-time monitoring. The system includes sensor-equipped containers that alert collection teams when full, AI-powered sorting mechanisms, and analytics dashboards that provide insights into waste generation patterns. This technology significantly reduces operational costs while improving recycling rates and environmental impact."
    },
    {
      id: "cyber-awareness-guidance",
      title: "Cyber Awareness Guidance & Consultancy",
      description: "Expert consultancy and training programs to enhance cybersecurity awareness.",
      icon: "🔒",
      details: "Our Cyber Awareness Guidance & Consultancy service provides comprehensive cybersecurity training and strategic guidance to protect your organization's digital assets. We offer tailored workshops, simulation exercises, and ongoing consultancy to build a strong security culture within your team. Our services include threat assessment, policy development, incident response planning, and continuous monitoring to ensure your organization stays ahead of evolving cyber threats."
    },
    {
      id: "e-commerce",
      title: "E-Commerce",
      description: "Complete e-commerce solutions to grow your business in the digital marketplace.",
      icon: "🛒",
      details: "Our E-Commerce solutions provide end-to-end digital storefront capabilities, from platform development to payment integration and logistics management. We specialize in creating seamless shopping experiences with personalized recommendations, secure payment processing, inventory management, and analytics tools. Our platform supports multiple sales channels, mobile optimization, and integrates with existing business systems to streamline operations and maximize revenue."
    },
    {
      id: "smart-healthcare-solutions",
      title: "Smart Healthcare Solutions",
      description: "Innovative healthcare solutions focused on quality and customer satisfaction.",
      icon: "🏥",
      details: "Our Smart Healthcare Solutions leverage cutting-edge technology to improve patient outcomes and operational efficiency. We provide telemedicine platforms, electronic health records systems, wearable health monitoring devices, and AI-powered diagnostic tools. These solutions enable healthcare providers to deliver personalized care, reduce costs, and improve accessibility while maintaining the highest standards of data security and patient privacy."
    },
    {
      id: "food-delivery",
      title: "Food Delivery",
      description: "Efficient and sustainable food delivery services connecting consumers with quality providers.",
      icon: "🍽️",
      details: "Our Food Delivery service connects consumers with local restaurants through an efficient and sustainable platform. We optimize delivery routes using AI algorithms, provide real-time tracking, and offer eco-friendly packaging options. Our system supports multiple payment methods, customer reviews, and loyalty programs. We prioritize partnerships with restaurants that source ingredients sustainably and maintain high quality standards."
    },
    {
      id: "new-renewable-energy",
      title: "New Renewable Energy",
      description: "Sustainable energy solutions harnessing the power of renewable resources for a cleaner future.",
      icon: "☀️",
      details: "Our New Renewable Energy solutions focus on implementing cutting-edge sustainable energy technologies including solar, wind, and emerging green technologies. We provide comprehensive energy audits, system design and installation, and ongoing monitoring services. Our approach helps organizations reduce carbon footprints, lower energy costs, and achieve sustainability goals through customized renewable energy systems that integrate seamlessly with existing infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for a sustainable future. Discover our range of innovative services designed to transform your business and protect our planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <GlassCard 
              key={service.id}
              className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={`/services/${service.id}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}