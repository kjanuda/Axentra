"use client"

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function CrosswalkPage() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    /*
      ✅ RULES TO KEEP bg-fixed WORKING:
      1. NO overflow-hidden
      2. NO transform (no translate, rotate, scale)
      3. NO will-change
      on THIS element or ANY parent up to <html>
    */
    <div ref={sectionRef} className="relative w-full min-h-screen bg-white">

      {/* ✅ bg-fixed parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/car.webp')", height: '45%' }}
      />

      {/* 🚗 car1.webp — NO transition-transform on this, use opacity only to avoid breaking bg-fixed */}
      <div
        className={`absolute top-[8%] sm:top-[10%] md:top-[12%] lg:top-[15%]
        left-0 w-full h-[50%] sm:h-[55%] md:h-[80%] lg:h-[85%]
        transition-opacity duration-[1200ms] delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/car1.webp"
          alt="Car"
          fill
          className="object-contain object-center md:object-right"
        />
      </div>

      {/* 📦 Content — NO transform transitions to keep bg-fixed safe */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end md:justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-12">

        <div className="flex flex-col md:flex-row items-start justify-between md:mt-[30%] lg:mt-[35%] xl:mt-[30%] gap-8 md:gap-12 lg:gap-16 pb-8 md:pb-0">

          {/* LEFT CONTENT */}
          <div className="w-full md:w-[55%] lg:w-1/2 max-w-2xl">

            <h2
              className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl
              font-normal text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-[1.1]
              transition-opacity duration-[1200ms] delay-500 ${
                isVisible ? 'opacity-00' : 'opacity-0'
              }`}
              
            >
              Meet the intelligence<br />behind Axentra
            </h2>

            <p
              className={`text-xs sm:text-sm md:text-lg lg:text-xl text-gray-700
              mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-xl
              transition-opacity duration-[1200ms] delay-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
We’re redefining vehicle security with Axentra — a smart IoT-powered system that gives you full control over your vehicle, anytime, anywhere.            </p>

            <button
              className={`flex items-center gap-3 text-gray-900 hover:gap-4
              transition-all duration-500 group ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-900 flex items-center justify-center group-hover:bg-gray-900 transition">
                <svg className="w-4 h-4 md:w-6 md:h-6 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-sm md:text-xl font-medium">
                Explore the Axentra
              </span>
            </button>

          </div>

          {/* RIGHT SIDE TEXT */}
          <div
            className={`hidden lg:flex items-center
            transition-opacity duration-[1200ms] delay-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h3 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 [writing-mode:vertical-lr] rotate-180 tracking-tight">
              A X E N T R A
            </h3>
          </div>

        </div>
      </div>
    </div>
  )
}