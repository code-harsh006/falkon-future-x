"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useSendMessage } from "@/lib/useSendMessage";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "@/components/ui/logo";
import HeroCarousel from "@/components/ui/hero-carousel";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { submitMessage } = useSendMessage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // Add autoplay parameter to the iframe src
            const currentSrc = videoRef.current.src;
            if (!currentSrc.includes('autoplay=1')) {
              videoRef.current.src = currentSrc + '&autoplay=1&mute=1';
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitMessage(formData.name, formData.email, formData.message);
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-navbar shadow-md' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20">
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-10">
              {['home', 'features', 'about', 'solutions', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'home' ? 'hero' : item)}
                  className="nav-link capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 absolute top-20 left-0 right-0 bg-white shadow-lg">
              <div className="flex flex-col space-y-4 px-4">
                {['home', 'features', 'about', 'solutions', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item === 'home' ? 'hero' : item)}
                    className="nav-link text-left capitalize py-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-gradient py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative z-2 fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Leading the <span className="highlight">Plastic Waste</span> Revolution
              </h1>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl">
                Join our mission to create a sustainable future through innovative recycling technology and community engagement.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">
                  Get Started
                </button>
                <button className="btn-outline">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative fade-in-up">
              <HeroCarousel />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-bg-secondary py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Our Features</h2>
            <p className="section-subtitle">
              Discover the powerful features that make our solution unique
            </p>
          </div>
          
          <div className="grid-responsive">
            {[
              { icon: "📷", title: "AI-Powered Scan", description: "Instantly identify plastic types and recycling instructions with our advanced AI technology." },
              { icon: "📍", title: "Smart Locator", description: "Find the nearest recycling centers and collection points in real-time." },
              { icon: "🪙", title: "Reward System", description: "Earn tokens for every recycling action that can be redeemed for exciting rewards." },
              { icon: "📈", title: "Impact Tracking", description: "Monitor your personal and community environmental impact with detailed analytics." }
            ].map((feature, index) => (
              <div key={index} className="feature-card glass-hover">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Our Mission & Vision</h2>
            <p className="section-subtitle">
              Committed to creating a sustainable future for generations to come
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To revolutionize plastic waste management through innovative technology and community-driven solutions, 
                creating a cleaner, greener planet for future generations.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                A world where plastic waste is efficiently recycled and repurposed, contributing to a circular economy 
                that benefits both the environment and society.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: "♻️", title: "Recycle" },
                  { icon: "👁️", title: "Awareness" },
                  { icon: "⚙️", title: "Innovate" }
                ].map((value, index) => (
                  <div key={index} className="value-item glass-card p-4 text-center">
                    <div className="text-2xl mb-2">{value.icon}</div>
                    <h4 className="font-semibold">{value.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="relative">
                <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
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
                <div className="image-caption glass-card mt-4">
                  <h4 className="font-bold">Plastic Waste Crisis</h4>
                  <p className="text-sm">
                    Over 300 million tons of plastic are produced annually, with less than 10% being recycled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="bg-bg-secondary py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Our Solutions</h2>
            <p className="section-subtitle">
              Comprehensive approaches to tackle the plastic waste challenge
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              { icon: "📱", title: "Mobile Application", description: "Our user-friendly app empowers individuals to scan plastic items, locate recycling centers, and track their environmental impact while earning rewards." },
              { icon: "🏭", title: "Corporate Solutions", description: "We provide businesses with data-driven insights into their plastic supply chains, helping optimize recycling processes and improve sustainability ratings." },
              { icon: "📊", title: "Analytics Dashboard", description: "Real-time data visualization for governments and organizations to monitor recycling rates, waste patterns, and environmental impact across regions." }
            ].map((solution, index) => (
              <div key={index} className="solution-item glass-hover">
                <div className="solution-icon">{solution.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-25 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Global Impact</h2>
            <p className="text-white/90 text-lg">
              Making a measurable difference in the fight against plastic pollution
            </p>
          </div>
          
          <div className="grid-responsive">
            {[
              { icon: "♻️", stat: "1.2M+", label: "Items Recycled" },
              { icon: "🌳", stat: "15M+", label: "Trees Preserved" },
              { icon: "👥", stat: "2.8M+", label: "Active Users" },
              { icon: "📍", stat: "75+", label: "Cities Covered" }
            ].map((item, index) => (
              <div key={index} className="stat-card glass-hover">
                <div className="stat-icon">{item.icon}</div>
                <div className="stat-content">
                  <div className="text-3xl font-bold text-white mb-2">{item.stat}</div>
                  <div className="text-white/90">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-25 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Passionate experts dedicated to environmental sustainability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Mr. Desh Premi", role: "CEO & Founder", desc: "Environmental Scientist with 15+ years of experience", image: "/founder.jpg" },
              { name: "Jadav Madhav", role: "CTO", desc: "Tech innovator specializing in AI and sustainability solutions", image: "/co-founder.jpg" },
              { name: "Amit Kumar", role: "Head of Operations", desc: "Logistics expert with a passion for environmental impact", image: "/head-of-operations.jpg" }
            ].map((member, index) => (
              <div key={index} className="team-member glass-card">
                <div className="member-image">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="member-info p-6">
                  <p className="member-role text-sm font-semibold text-primary">{member.role}</p>
                  <h3 className="text-xl font-semibold mt-1 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have questions or want to join our mission? Reach out to us!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Reach out for partnerships, questions, or to join our team.
              </p>
              
              <div className="space-y-6">
                <div className="contact-item">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Headquarters</h4>
                    <p className="text-gray-600">House No. 293, Second Floor
Western Marg, Saidulajab
Near Kher Singh Estate
New Delhi – 110030
India</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@falkonfuturex.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="text-2xl">🌐</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Website</h4>
                    <p className="text-gray-600">www.falkonfuturex.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="contact-form">
                {submitSuccess ? (
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                    <p className="font-medium">Thank you for your message!</p>
                    <p>We'll get back to you soon.</p>
                  </div>
                ) : null}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name" 
                      className="form-input"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      className="form-input"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message here..." 
                      rows={5}
                      className="form-input"
                      required 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-content">
            <div className="footer-logo">
              <Logo showText={true} className="text-2xl" />
              <p className="text-gray-600">
                Leading the plastic waste revolution through innovative technology and community engagement.
              </p>
              <div className="social-icons">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="social-icon"
                    aria-label={social}
                  >
                    <div className="w-5 h-5 bg-gray-200 border-2 border-dashed rounded-xl" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="footer-links">
              <h4 className="font-poppins">Quick Links</h4>
              <ul>
                {['Home', 'Features', 'About', 'Solutions', 'Contact'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase())}
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-links">
              <h4 className="font-poppins">Solutions</h4>
              <ul>
                {['Mobile App', 'Corporate', 'Analytics', 'Community'].map((solution) => (
                  <li key={solution}>
                    <a href="#" className="hover:text-primary transition-colors duration-300">{solution}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-links">
              <h4 className="font-poppins">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span>📍</span>
                  <span className="text-gray-600">House No. 293, Second Floor
Western Marg, Saidulajab
Near Kher Singh Estate
New Delhi – 110030
India</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📧</span>
                  <a href="mailto:falkonfuturex@gmail.com" className="text-gray-600 hover:text-primary transition-colors duration-300">info@falkonfuturex.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span>🌐</span>
                  <a href="https://www.falkonfuturex.com" className="text-gray-600 hover:text-primary transition-colors duration-300">www.falkonfuturex.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} . All rights reserved. 
              Made with <span className="text-red-500">❤</span> for our planet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}