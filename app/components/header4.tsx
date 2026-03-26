"use client";

import { useEffect, useState } from "react";

const features = [
  {
    id: 1,
    title: "Remote Start",
    description: "Car Chabi is a solution for your car which makes your life easier by providing you with the facility to remote start your car from your phone. Car Chabi makes life easier by removing the hassle of carrying the car keys all the time. Car Chabi facilitates you by providing you an ease in accessing your car with a smartphone."
  },
  {
    id: 2,
    title: "Proximity",
    description: "Another core feature of Car Chabi is Proximity which makes your life so much easier that you don't even have to take out the mobile phone from your pocket and the car will automatically get unlocked when you come near the car and will automatically start when you sit in the car. This feature can be enabled or disabled if you want. Ranges can be set by the user itself."
  },
  {
    id: 3,
    title: "Auto Security",
    description: "Auto security is also one of the features worth mentioning which allow you to secure your car from the smartphone. With Car Chabi device, your car will automatically get immobilized, once the phone gets disconnected from the car. In case of snatching or theft, the car will be immobilized after the time specified by the user. Auto Security makes the car more secure in the situations where you feel that the car is not safe."
  }
];

export default function SmartPhoneFeatures() {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState([false, false, false]);
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Title animation
      const titleElement = document.getElementById('smartphone-title');
      if (titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        setIsTitleVisible(isVisible);
      }

      // Features animation (staggered)
      features.forEach((_, index) => {
        const featureElement = document.getElementById(`feature-${index}`);
        if (featureElement) {
          const rect = featureElement.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
          if (isVisible) {
            setVisibleFeatures(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        }
      });

      // Phone animation
      const phoneElement = document.getElementById('phone-mockup');
      if (phoneElement) {
        const rect = phoneElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        setIsPhoneVisible(isVisible);
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full bg-white py-16 px-6 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Title with Gradient */}
        <h2 
          id="smartphone-title"
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-16 lg:mb-20 transition-all duration-1000 ${
            isTitleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{
            background: "linear-gradient(90deg, #0ea5e9, #06b6d4, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "0.02em"
          }}
        >
          All In Your Smart Phone
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Features List */}
          <div className="space-y-10 lg:space-y-12">
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                id={`feature-${index}`}
                className={`flex gap-5 transition-all duration-1000 ${
                  visibleFeatures[index] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Play Button Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-white hover:bg-cyan-50 transition-colors cursor-pointer group">
                    <svg 
                      className="w-7 h-7 text-cyan-400 ml-0.5 group-hover:scale-110 transition-transform" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 
                    className="text-xl md:text-2xl font-semibold mb-3"
                    style={{
                      color: "#22d3ee",
                      fontFamily: "'Rajdhani', sans-serif"
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Phone Mockup */}
          <div 
            id="phone-mockup"
            className={`relative lg:sticky lg:top-24 flex justify-center lg:justify-end transition-all duration-1000 ${
              isPhoneVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              <img
                src="/mo.png"
                alt="Car Chabi App Interface"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}