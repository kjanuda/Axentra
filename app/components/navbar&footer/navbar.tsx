"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Right-side SVG Icons ───────────────────────────────────────────────────

const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <circle cx="12" cy="17" r=".5" fill="currentColor" stroke="none" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const AccountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Nav links — matched to your actual pages ───────────────────────────────
const navLinks = [
  { label: "Home",            href: "/"                    },
  { label: "About",           href: "/about"               },
  { label: "Research",        href: "/research"            },
  { label: "Contact",         href: "/contact"             },
];

const BACKEND_URL = "http://localhost:4000";

// ── Component ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [user, setUser]                   = useState<{ name: string; email: string; photo: string; token: string } | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [photoError, setPhotoError]       = useState(false);

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Load user from localStorage + handle OAuth callback ─────────────────
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("user"); }
    }

    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");
    const email  = params.get("email");
    const name   = params.get("name");
    const photo  = params.get("photo");

    if (token && email) {
      const userData = {
        name:  name  || email.split("@")[0],
        email: email,
        photo: photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`,
        token: token,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // ── Close profile menu on outside click ─────────────────────────────────
  useEffect(() => {
    if (!showProfileMenu) return;
    const handler = () => setShowProfileMenu(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showProfileMenu]);

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfileMenu(false);
    setMobileOpen(false);
    localStorage.removeItem("user");
    setPhotoError(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <nav
          className="mx-auto flex h-[56px] max-w-[1400px] items-center px-4 sm:px-6 lg:px-10"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="flex-shrink-0 text-black transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <Image
              src="/icn2.png"
              alt="Logo"
              width={180}
              height={40}
              className="h-[95px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden flex-1 list-none items-center justify-center gap-1 lg:flex">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="
                    relative px-4 py-1.5
                    text-[13px] font-medium tracking-wide text-gray-800
                    transition-colors hover:text-black
                    after:absolute after:bottom-0 after:left-1/2 after:h-px
                    after:w-0 after:-translate-x-1/2 after:bg-black
                    after:transition-all after:duration-200
                    hover:after:w-full
                    focus-visible:rounded focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-black
                  "
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-0.5">

            {/* Desktop — Help, Language, Account */}
            <div className="hidden items-center gap-0.5 lg:flex">
              
                

              {/* Account / Profile */}
              {user ? (
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex h-11 w-11 items-center justify-center rounded-full overflow-hidden border-2 border-transparent hover:border-gray-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black bg-gray-100"
                    aria-label={`Profile: ${user.name}`}
                  >
                    {!photoError && user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="h-full w-full object-cover rounded-full"
                        onError={() => setPhotoError(true)}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <AccountIcon />
                    )}
                  </button>

                  {/* Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  aria-label="Account"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-all hover:bg-black/5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <AccountIcon />
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-black/5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black lg:hidden"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      <aside
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-[56px] items-center justify-between border-b border-gray-100 px-5">
          <span className="text-sm font-semibold uppercase tracking-widest text-gray-900">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-2 py-4">
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 40}ms` }}
              className="flex items-center rounded-lg px-4 py-3.5 text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-100 px-4 py-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="relative h-10 w-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  {!photoError && user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="h-full w-full object-cover rounded-full"
                      onError={() => setPhotoError(true)}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center"><AccountIcon /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                aria-label="Help"
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-3 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
              >
                <HelpIcon />
                Help
              </button>
              <button
                aria-label="Language"
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-3 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
              >
                <GlobeIcon />
                Language
              </button>
              <button
                onClick={handleLogin}
                aria-label="Account"
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-3 text-[10px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
              >
                <AccountIcon />
                Account
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}