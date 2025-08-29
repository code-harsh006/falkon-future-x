"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Plastic crisis images data
  const slides = [
    {
      image: "/plastic_1.jpg",
      title: "Plastic Pollution Crisis",
      description: "Over 300 million tons of plastic are produced annually, with less than 10% being recycled."
    },
    {
      image: "/image_3.jpg",
      title: "Marine Life Impact",
      description: "Over 1 million marine animals die each year due to plastic pollution in our oceans."
    },
    {
      image: "/image_4.jpg",
      title: "Microplastics Threat",
      description: "Microplastics have been found in drinking water, food, and even human blood."
    },
    {
      image: "/image_2.jpg",
    title: "Animal Deaths from Plastic",
    description: "Hundreds of thousands of animals, including turtles, whales, seabirds, and livestock, die each year from ingesting or becoming entangled in plastic waste."
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl">
      <div className="relative h-96 w-full">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image 
              src={slide.image} 
              alt={slide.title} 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;