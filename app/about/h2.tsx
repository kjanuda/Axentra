'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="about-section"
      className="relative w-full min-h-screen bg-white py-16 px-6 md:px-12 lg:px-20"
    >
      {/* More About Us - Top Left */}
      <div 
        className={`flex items-center gap-4 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="w-14 h-14 border-2 border-gray-400 rounded-full flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
        <span className="text-lg text-gray-400 font-light tracking-wide">
          More About Us
        </span>
      </div>

      {/* Main Headline */}
      <div 
        className={`mb-20 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-600 tracking-wide leading-tight">
          IMAGINE. INNOVATE. INSPIRE.
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column - Text Content */}
        <div 
          className={`space-y-12 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          {/* About Us */}
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-gray-500 mb-6">
              About Us
            </h3>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              We Axentra Innovation (Private) Limited, are official manufacturers of All types of Electric vehicles, computer vision based products, Agricultural products, eco-friendly Vending machines, all types of EV Chargers, High efficient Solar products, designs and prototypes.
            </p>
          </div>

          {/* We Collaborate */}
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-gray-500 mb-6">
              We Collaborate
            </h3>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              We challenge everything we do, from ideas to processes and even the minute detail that may seem insignificant to another.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div 
          className={`relative w-full h-[550px] lg:h-[650px] transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
          <Image
            src="/g2.png"
            alt="Team collaboration"
            fill
            className="object-cover grayscale"
            quality={200}
          />
        </div>
      </div>
    </section>
  );
}