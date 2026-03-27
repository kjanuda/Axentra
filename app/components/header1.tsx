"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isHeadlineVisible, setIsHeadlineVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const imageSection = document.getElementById('product-image');
      const headlineSection = document.getElementById('headline-section');

      if (imageSection) {
        const rect = imageSection.getBoundingClientRect();
        setIsImageVisible(rect.top < window.innerHeight && rect.bottom >= 0);
      }

      if (headlineSection) {
        const rect = headlineSection.getBoundingClientRect();
        setIsHeadlineVisible(rect.top < window.innerHeight * 0.8 && rect.bottom >= 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex items-center overflow-x-hidden relative">

      {/* WATERMARK BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[20vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-gray-100 leading-none select-none">
          Axentra
        </h1>
      </div>

      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center relative z-10">

        {/* LEFT SIDE - TEXT */}
        <div className="space-y-6 sm:space-y-7 md:space-y-8 order-2 lg:order-1">

          {/* HEADLINE */}
          <div
            id="headline-section"
            className={`space-y-4 transition-all duration-1000 ${
              isHeadlineVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-[28px] leading-[1.2] sm:text-[36px] sm:leading-[1.2] md:text-[48px] md:leading-[1.15] lg:text-[56px] lg:leading-[1.1] xl:text-[64px] xl:leading-[1.1] font-bold text-[#5a5a5a] tracking-normal">
              Secure Your Vehicle with Axentra
            </h1>
          </div>

          <p className={`text-[15px] leading-[1.6] sm:text-[16px] sm:leading-[1.65] md:text-[17px] md:leading-[1.7] lg:text-[18px] lg:leading-[1.75] text-[#7a7a7a] max-w-lg font-normal transition-all duration-1000 delay-200 ${
            isHeadlineVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Smart IoT-based vehicle security system designed to protect your car in real time.
            Powered by ESP32, GPS, and GSM/4G connectivity, Axentra enables live tracking,
            instant theft alerts, remote engine control, and intelligent monitoring.
          </p>

          {/* CTA */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 transition-all duration-1000 delay-400 ${
            isHeadlineVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button
              onClick={() => { window.location.href = 'https://axentra-backend-production-e185.up.railway.app/auth/google'; }}
              className="group px-7 py-3.5 sm:px-8 sm:py-4 bg-[#5a5a5a] text-white font-semibold rounded-lg hover:bg-[#4a4a4a] hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto text-[15px] sm:text-[16px]"
            >
              <span className="relative z-10">Get Started</span>
            </button>

            <button
              onClick={() => router.push('/Learn')}
              className="px-7 py-3.5 sm:px-8 sm:py-4 border-2 border-[#d0d0d0] text-[#5a5a5a] font-semibold rounded-lg hover:bg-gray-50 hover:border-[#b0b0b0] hover:scale-105 transition-all duration-300 w-full sm:w-auto text-[15px] sm:text-[16px]"
            >
              Learn More
            </button>
          </div>

          {/* STATS */}
          <div className={`grid grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-4 sm:pt-5 md:pt-6 transition-all duration-1000 delay-600 ${
            isHeadlineVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          </div>

        </div>

        {/* RIGHT SIDE - PRODUCT IMAGE */}
        <div
          id="product-image"
          className={`relative w-full h-[300px] sm:h-[380px] md:h-[450px] lg:h-[520px] transition-all duration-1000 order-1 lg:order-2 ${
            isImageVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <Image
            src="/axit.png"
            alt="Axentra Device"
            fill
            className="object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-up-delay-1 { opacity: 0; animation: fadeInUp 0.8s ease-out 0.2s forwards; }
        .animate-fade-in-up-delay-2 { opacity: 0; animation: fadeInUp 0.8s ease-out 0.4s forwards; }
        .animate-fade-in-up-delay-3 { opacity: 0; animation: fadeInUp 0.8s ease-out 0.6s forwards; }
        .animate-fade-in-right { animation: fadeInRight 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}