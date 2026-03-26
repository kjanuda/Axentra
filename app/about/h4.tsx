"use client";

import { useEffect, useState } from 'react';

export default function VisionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('vision-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      id="vision-section"
      className="relative w-full min-h-screen bg-white flex items-center justify-center px-6 py-20"
    >
      {/* Decorative Circle - Top Center */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ width: '400px', height: '400px' }}
      >
        <div className="w-full h-full border-[1.5px] border-gray-300 rounded-full" />
      </div>

      {/* Quote Text Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 
          className={`font-light leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            color: '#6B6B6B',
            letterSpacing: '0.02em'
          }}
        >
          "With<br />
          Infinite Imaginations<br />
          We Can Achieve<br />
          Greatness Together"
        </h2>
      </div>
    </div>
  );
}