"use client";

import { useState, useEffect } from "react";
import { Lock, Unlock, Shield, Radio, Share2, Car, PowerOff } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Lock,
    title: "Lock/Unlock",
    description: "One tap control of the car is in your smartphone. User can lock and unlock the car with a single tap on the RACK-Pro App.",
    backTitle: "ONE TAP CONTROLS",
    backDescription: "The lock and unlock buttons on the main screen allows you a quick access of your car. These buttons lock and unlock your car from smartphone app."
  },
  {
    id: 2,
    icon: Shield,
    title: "Auto Security",
    description: "This button activates the auto security system of the car. Once the device is disconnected from smartphone, the car will not start.",
    backTitle: "AUTO SECURITY SYSTEM",
    backDescription: "Automatically protects your vehicle when disconnected from your phone. The engine immobilizer prevents unauthorized access even with physical keys."
  },
  {
    id: 3,
    icon: PowerOff,
    title: "Engine Deactivate",
    description: "With this button user can deactivate the car engine whenever they want and hence rendering the keys useless.",
    backTitle: "REMOTE ENGINE CONTROL",
    backDescription: "Instantly disable your car's engine from anywhere. This feature provides an additional layer of security by making physical keys ineffective."
  },
  {
    id: 4,
    icon: Radio,
    title: "Real-time Tracking",
    description: "Track your vehicle's location in real-time with GPS integration. Get instant alerts for any movement or unauthorized access.",
    backTitle: "GPS LOCATION TRACKING",
    backDescription: "Advanced GPS technology provides precise location updates every few seconds. Set geofence boundaries and receive alerts when your car moves."
  },
  {
    id: 5,
    icon: Share2,
    title: "Share Access",
    description: "Share temporary access to your vehicle with family members or trusted individuals through the app.",
    backTitle: "SMART ACCESS SHARING",
    backDescription: "Grant time-limited access to others without sharing physical keys. Monitor who accessed your vehicle and when."
  },
  {
    id: 6,
    icon: Car,
    title: "Multiple Car Control",
    description: "Manage multiple vehicles from a single app. Switch between cars seamlessly and monitor all your vehicles at once.",
    backTitle: "FLEET MANAGEMENT",
    backDescription: "Control unlimited vehicles from one dashboard. Perfect for families with multiple cars or small business fleets."
  }
];

const FeatureCard = ({ feature, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`feature-${feature.id}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [feature.id]);

  const IconComponent = feature.icon;

  return (
    <div
      id={`feature-${feature.id}`}
      className={`relative w-full h-[320px] sm:h-[340px] cursor-pointer transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ 
        perspective: "1000px",
        transitionDelay: `${index * 100}ms`
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-all duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[#5a5a5a]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#5a5a5a] mb-4">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#7a7a7a] leading-relaxed font-normal">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden bg-[#2a2a2a] shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-between">
            {/* Back Title */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 tracking-wide">
                {feature.backTitle}
              </h3>

              {/* Back Description */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {feature.backDescription}
              </p>
            </div>

            {/* Bottom Icon */}
            <div className="flex justify-end">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-lg flex items-center justify-center">
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white/80" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#f8f8f8] py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5a5a5a] mb-4">
            Features That Matter
          </h2>
          <p className="text-base sm:text-lg text-[#7a7a7a] max-w-2xl mx-auto">
            Powerful security features designed to protect your vehicle with intelligent technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}