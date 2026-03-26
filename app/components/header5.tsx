"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isLeftImageVisible, setIsLeftImageVisible] = useState(false);
  const [isRightContentVisible, setIsRightContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const leftImage = document.getElementById('left-image');
      const rightContent = document.getElementById('right-content');

      if (leftImage) {
        const rect = leftImage.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        setIsLeftImageVisible(isVisible);
      }

      if (rightContent) {
        const rect = rightContent.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        setIsRightContentVisible(isVisible);
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full bg-[#f3f3f3] py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">

        {/* LEFT IMAGE */}
        <div 
          id="left-image"
          className={`relative w-full lg:w-[55%] h-[420px] md:h-[520px] transition-all duration-1000 ${
            isLeftImageVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}
        >
          <Image
            src="/axe.png"
            alt="Electronics Work"
            fill
            className="object-cover"
            priority
          />

          {/* SMALL IMAGE OVERLAY */}
          <div 
            className={`absolute bottom-[-60px] right-[40px] w-[180px] h-[130px] md:w-[240px] md:h-[170px] shadow-xl transition-all duration-1000 delay-300 ${
              isLeftImageVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <Image
              src="/ax1.png"
              alt="detail"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT BOX */}
        <div 
          id="right-content"
          className={`w-full lg:w-[45%] bg-[#ededed] px-10 md:px-16 py-14 relative transition-all duration-1000 ${
            isRightContentVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}
        >

          {/* subtle circle decoration */}
          <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] border border-gray-300 rounded-full opacity-40"></div>

          <h1 className="text-4xl md:text-5xl font-medium text-gray-600 leading-tight">
            Redefining <br /> Tomorrow's World
          </h1>

          <p className="mt-6 text-gray-500 leading-relaxed text-sm md:text-base">
            Inspired by a hyper creative generation of multidisciplinary
            innovators, our passion brought us here.
          </p>

          <p className="mt-4 text-gray-500 leading-relaxed text-sm md:text-base">
            We are now ready to revolutionise the world we live in with
            cutting-edge technology, to enhance lives, to bring people closer
            to nature and to each other in extraordinary ways.
          </p>

          <Link href="/about">
            <button className="mt-8 px-8 py-3 border border-gray-500 text-gray-700 tracking-widest hover:bg-gray-800 hover:text-white transition">
              ABOUT US →
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}