"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* ── Background Image – Ken Burns zoom + slow pan ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animation: isVisible ? 'kenBurns 18s ease-in-out infinite alternate' : 'none' }}
      >
        <Image
          src="/g1.png"
          alt="Workshop team"
          fill
          className="object-cover grayscale"
          priority
          quality={100}
          style={{ transformOrigin: 'center center' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Subtle shimmer sweep across the image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'shimmer 8s ease-in-out infinite' }}
        />
      </div>

      {/* ── Decorative Circle – Large (left, vertically centered) ── */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          width: 'clamp(200px, 28vw, 350px)',
          height: 'clamp(200px, 28vw, 350px)',
          animation: isVisible ? 'rotateSlow 30s linear infinite' : 'none',
        }}
      >
        <div className="w-full h-full border-[1.5px] border-white/25 rounded-full" />
        {/* Inner dashed ring */}
        <div
          className="absolute inset-[18%] border border-dashed border-white/10 rounded-full"
          style={{ animation: isVisible ? 'rotateSlow 20s linear infinite reverse' : 'none' }}
        />
      </div>

      {/* ── Decorative Circle – Small (bottom-left) ── */}
      <div
        className={`absolute left-[4vw] bottom-[10vh] transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          width: 'clamp(70px, 8vw, 110px)',
          height: 'clamp(70px, 8vw, 110px)',
          animation: isVisible ? 'pulsate 4s ease-in-out infinite' : 'none',
        }}
      >
        <div className="w-full h-full border-[1.5px] border-white/25 rounded-full" />
      </div>

      {/* ── Decorative Circle – Extra small (top-right accent) ── */}
      <div
        className={`absolute right-[6vw] top-[12vh] transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          width: 'clamp(40px, 5vw, 72px)',
          height: 'clamp(40px, 5vw, 72px)',
          animation: isVisible ? 'pulsate 6s ease-in-out infinite 1s' : 'none',
        }}
      >
        <div className="w-full h-full border border-white/15 rounded-full" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6">

        {/* Thin horizontal rule – animates in */}
        <div
          className={`mb-5 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            width: 'clamp(40px, 6vw, 80px)',
            height: '1px',
            background: 'rgba(255,255,255,0.3)',
            transformOrigin: 'center',
          }}
        />

        {/* "A BRAND" */}
        <p
          className={`font-light tracking-[0.15em] text-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 3rem)',
            color: '#ABABAB',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            letterSpacing: '0.18em',
          }}
        >
          A BRAND
        </p>

        {/* "Inspired by Passion" */}
        <p
          className={`font-light tracking-[0.12em] text-center mt-2 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 3rem)',
            color: '#ABABAB',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Inspired by Passion
        </p>

        {/* Bottom rule */}
        <div
          className={`mt-5 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            width: 'clamp(40px, 6vw, 80px)',
            height: '1px',
            background: 'rgba(255,255,255,0.3)',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* ── Bottom + Top fades ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* ── Keyframe definitions ── */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1)    translateX(0)      translateY(0); }
          33%  { transform: scale(1.06) translateX(-1%)    translateY(-0.5%); }
          66%  { transform: scale(1.04) translateX(1%)     translateY(0.5%); }
          100% { transform: scale(1.08) translateX(-0.5%)  translateY(-1%); }
        }

        @keyframes shimmer {
          0%   { background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%); background-size: 200% 100%; background-position: -100% 0; }
          50%  { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes pulsate {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.12); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}