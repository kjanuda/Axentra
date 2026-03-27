"use client";

// ── Corner bracket decoration ──────────────────────────────────────────────
const CornerBrackets = () => (
  <>
    <span className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-t-2 border-l-2 border-cyan-400/80 z-20" />
    <span className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-t-2 border-r-2 border-cyan-400/80 z-20" />
    <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-b-2 border-l-2 border-cyan-400/80 z-20" />
    <span className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-b-2 border-r-2 border-cyan-400/80 z-20" />
  </>
);

export default function HeroHeader() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Exo+2:wght@300;400;500&display=swap');

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        .fu-1 { animation: fade-up 0.9s ease forwards 0.2s; opacity: 0; }
        .fu-2 { animation: fade-up 0.9s ease forwards 0.45s; opacity: 0; }
        .fu-3 { animation: fade-up 0.9s ease forwards 0.7s; opacity: 0; }
        .fu-4 { animation: fade-up 0.9s ease forwards 0.95s; opacity: 0; }
        .blink-dot { animation: blink-dot 1.8s ease-in-out infinite; }
      `}</style>

      {/* 🔥 Wrapper added */}
      <div className="relative">

        {/* 🔥 Fixed Background Video (NEW) */}
        <div className="fixed inset-0 -z-10">
          <video
            src="/key.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />

          {/* overlays (moved here) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* ── Main Section (unchanged design) ── */}
        <section
          className="relative w-full overflow-hidden bg-transparent"
          style={{ height: "90svh", minHeight: "500px", maxHeight: "800px" }}
        >
          {/* ── Corner brackets ── */}
          <CornerBrackets />

          {/* ── Main text ── */}
          <div
            className="absolute bottom-0 left-0 z-20
              px-5 pb-10
              sm:px-10 sm:pb-14
              lg:px-16 lg:pb-16
              w-full max-w-full sm:max-w-xl lg:max-w-2xl"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            <p className="fu-1 mb-2 sm:mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-cyan-400/90">
              Car Security · IoT Platform
            </p>

            <h1
              className="fu-2 text-white font-bold leading-[1.08] tracking-tight"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(1.8rem, 5vw, 4rem)",
                textShadow: "0 2px 30px rgba(0,0,0,0.6)",
              }}
            >
              Intelligent Protection
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #22d3ee, #06b6d4)",
                }}
              >
                For Every Journey
              </span>
            </h1>

            <p
              className="fu-3 mt-3 sm:mt-4 text-white/65 font-light leading-relaxed"
              style={{ fontSize: "clamp(0.8rem, 1.6vw, 1.05rem)" }}
            >
              Real-time GPS tracking, AI-powered intrusion detection,
              and encrypted remote access — all in one connected platform.
            </p>

            <div className="fu-4 mt-5 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="https://axentra-backend-production-e185.up.railway.app/auth/google"
                className="px-5 py-2.5 sm:px-7 sm:py-3 rounded text-xs sm:text-sm font-semibold tracking-widest uppercase text-black transition-opacity hover:opacity-90"
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  background: "linear-gradient(135deg, #22d3ee, #0891b2)",
                }}
              >
                Get Protected
              </a>
              <a
                href="/work"
                className="px-5 py-2.5 sm:px-7 sm:py-3 rounded text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/80 border border-white/25 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* ── Bottom-right stats ── */}
          <div
            className="hidden sm:flex absolute bottom-16 right-10 z-20 flex-col items-end gap-3 fu-3"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
          </div>

        </section>

      </div>
    </>
  );
}