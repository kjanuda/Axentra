"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const NewsletterInput = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-auto sm:mx-0">
      <div
        className={`
          relative flex w-full overflow-hidden rounded-xl border
          transition-all duration-300
          ${focused
            ? "border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
            : "border-white/15"
          }
          bg-white/5 backdrop-blur-sm
        `}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your@email.com"
          required
          className="
            flex-1 min-w-0 px-4 py-3 text-sm bg-transparent
            text-white placeholder-white/25
            outline-none
            transition-colors duration-200
          "
        />
        <button
          type="submit"
          className="
            m-1.5 px-5 py-2 text-xs font-bold uppercase tracking-widest
            bg-red-600 hover:bg-red-500 text-white
            rounded-lg
            transition-all duration-200 active:scale-95
            whitespace-nowrap flex-shrink-0
          "
        >
          {submitted ? "✓ Done" : "Subscribe"}
        </button>
      </div>
    </form>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* ── BACKGROUND IMAGE (from second footer) ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/footer.jpg')" }}
      />
      {/* Dark overlay — matches second footer gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/75" />
      {/* Red tint wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent" />
      {/* Top border glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      {/* Diagonal red accent — top left corner (kept from first footer) */}
      <div
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(220,38,38,0.12) 0%, transparent 65%)",
        }}
      />
      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">

        {/* ━━ ROW 1 ━━  Logo centred + tagline */}
        <div className="py-16 text-center border-b border-white/[0.07]">
          <a href="/" className="inline-block mb-5 group">
            <Image
              src="/icn2.png"
              alt="Logo"
              width={160}
              height={40}
              className="h-28 w-auto mx-auto object-contain brightness-0 invert opacity-90 transition-all duration-500 ease-out group-hover:scale-210 group-hover:opacity-100"
            />
          </a>
          <p className="text-white/25 text-xs tracking-[0.22em] uppercase font-medium">
            Accelerating the world&apos;s transition to sustainable energy
          </p>
        </div>

        {/* ━━ ROW 2 ━━  Nav left · Social right */}
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/[0.07]">
          <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  relative text-sm text-white/40 font-medium
                  hover:text-white transition-colors duration-200
                  after:absolute after:left-0 after:-bottom-0.5 after:h-[1px]
                  after:w-0 after:bg-red-500
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons — with glow animation from second footer */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex h-8 w-8 items-center justify-center
                  rounded-full border border-white/10 bg-white/5 text-white/35
                  backdrop-blur-sm
                  hover:border-red-500/50 hover:text-white hover:bg-red-500/20
                  hover:shadow-[0_0_12px_rgba(239,68,68,0.3)]
                  transition-all duration-500 ease-out
                "
              >
                <span className="transition-all duration-500 ease-out group-hover:scale-125">
                  {icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ━━ ROW 3 ━━  Newsletter strip */}
        <div className="py-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 border-b border-white/[0.07]">
          <div className="flex-shrink-0 text-center sm:text-left">
            <p className="text-white text-sm font-semibold leading-tight">
              Stay in the loop
            </p>
            <p className="text-white/30 text-xs mt-1">
              News &amp; launches — straight to your inbox.
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10 flex-shrink-0" />
          <div className="w-full sm:flex-1">
            <NewsletterInput />
          </div>
        </div>

        {/* ━━ ROW 4 ━━  Copyright micro bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/20">
          <span>
            © {currentYear} All rights reserved.{" "}
            Project, Idea  &amp; Design by{" "}
            <a
              href="https://kjanuda.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-150 underline underline-offset-2"
            >
              Januda J Kodithuwakku
            </a>
          </span>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Legal", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-white/50 transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}