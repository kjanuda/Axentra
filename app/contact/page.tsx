"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const BACKEND_URL = "https://axentra-backend-production-e185.up.railway.app";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await fetch(`${BACKEND_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 py-16 relative"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#faf9f7",
      }}
    >
      {/* Diagonal lines texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #000 0px,
            #000 1px,
            transparent 1px,
            transparent 12px
          )`,
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto">

        {/* ── Header split layout ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gray-400" />
              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
                Contact
              </p>
            </div>
            <h1
              className="text-6xl md:text-7xl font-normal text-gray-900 leading-[1.0]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Say
            </h1>
            <h1
              className="text-6xl md:text-7xl font-normal text-gray-900 leading-[1.0] italic"
              style={{ letterSpacing: "-0.03em" }}
            >
              Hello.
            </h1>
          </div>

          {/* Right side info strip */}
          <div className="flex flex-col gap-4 md:text-right md:pb-2">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-1" style={{ fontFamily: "sans-serif" }}>Based in</p>
              <p className="text-sm text-gray-600" style={{ fontFamily: "sans-serif" }}>Colombo, Sri Lanka  </p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-1" style={{ fontFamily: "sans-serif" }}>Available for</p>
              <p className="text-sm text-gray-600" style={{ fontFamily: "sans-serif" }}>Freelance · Full-time</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-1" style={{ fontFamily: "sans-serif" }}>Response time</p>
              <p className="text-sm text-gray-600" style={{ fontFamily: "sans-serif" }}>24–48 hours</p>
            </div>
          </div>
        </div>

        {/* ── Info cards row ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Email */}
          <a
            href="mailto:hello@axentra.com"
            className="group flex items-start gap-4 p-6 border border-gray-200 hover:border-gray-900 bg-white transition-all duration-300"
            style={{ boxShadow: "2px 2px 0px #e5e7eb" }}
          >
            <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300">
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-1.5" style={{ fontFamily: "sans-serif" }}>Email</p>
              <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors" style={{ fontFamily: "sans-serif" }}>hello@axentra.com</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+94773007426"
            className="group flex items-start gap-4 p-6 border border-gray-200 hover:border-gray-900 bg-white transition-all duration-300"
            style={{ boxShadow: "2px 2px 0px #e5e7eb" }}
          >
            <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300">
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-1.5" style={{ fontFamily: "sans-serif" }}>Phone</p>
              <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors" style={{ fontFamily: "sans-serif" }}>+94 (773) 007-426</p>
            </div>
          </a>

          {/* Social */}
          <div
            className="flex items-start gap-4 p-6 border border-gray-200 bg-white"
            style={{ boxShadow: "2px 2px 0px #e5e7eb" }}
          >
            <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-2" style={{ fontFamily: "sans-serif" }}>Social</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "Twitter / X", href: "https://twitter.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    <span>{s.label}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="w-1.5 h-1.5 bg-gray-300" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* ── Form ───────────────────────────────────────────────────────── */}
        {submitted ? (
          <div
            className="p-16 text-center bg-white border border-gray-200"
            style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
          >
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.02em" }}>
              Message sent.
            </h3>
            <p className="text-gray-400 text-sm mb-8" style={{ fontFamily: "sans-serif" }}>
              Thank you for reaching out. I'll get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors border-b border-gray-200 pb-0.5"
              style={{ fontFamily: "sans-serif" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <div
            className="bg-white border border-gray-200 overflow-hidden"
            style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
          >
            {/* Form header bar */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400" style={{ fontFamily: "sans-serif" }}>
                  Message Form
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300" style={{ fontFamily: "sans-serif" }}>
                All fields marked * are required
              </p>
            </div>

            <div className="p-8 md:p-10">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-[0.35em] mb-2"
                    style={{ fontFamily: "sans-serif", color: focused === "name" ? "#111" : "#9ca3af" }}
                  >
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className="w-full text-gray-900 text-base px-5 py-3 outline-none placeholder:text-gray-300 transition-all duration-200"
                    style={{
                      fontFamily: "inherit",
                      background: focused === "name" ? "#faf9f7" : "#f9fafb",
                      border: focused === "name" ? "1px solid #111827" : "1px solid #e5e7eb",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-[0.35em] mb-2"
                    style={{ fontFamily: "sans-serif", color: focused === "email" ? "#111" : "#9ca3af" }}
                  >
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="john@example.com"
                    className="w-full text-gray-900 text-base px-5 py-3 outline-none placeholder:text-gray-300 transition-all duration-200"
                    style={{
                      fontFamily: "inherit",
                      background: focused === "email" ? "#faf9f7" : "#f9fafb",
                      border: focused === "email" ? "1px solid #111827" : "1px solid #e5e7eb",
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label
                  className="block text-[10px] uppercase tracking-[0.35em] mb-2"
                  style={{ fontFamily: "sans-serif", color: focused === "subject" ? "#111" : "#9ca3af" }}
                >
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  placeholder="What's this about?"
                  className="w-full text-gray-900 text-base px-5 py-3 outline-none placeholder:text-gray-300 transition-all duration-200"
                  style={{
                    fontFamily: "inherit",
                    background: focused === "subject" ? "#faf9f7" : "#f9fafb",
                    border: focused === "subject" ? "1px solid #111827" : "1px solid #e5e7eb",
                  }}
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  className="block text-[10px] uppercase tracking-[0.35em] mb-2"
                  style={{ fontFamily: "sans-serif", color: focused === "message" ? "#111" : "#9ca3af" }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Write your message here..."
                  rows={6}
                  className="w-full text-gray-900 text-base px-5 py-4 resize-none outline-none placeholder:text-gray-300 transition-all duration-200"
                  style={{
                    fontFamily: "inherit",
                    background: focused === "message" ? "#faf9f7" : "#f9fafb",
                    border: focused === "message" ? "1px solid #111827" : "1px solid #e5e7eb",
                  }}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-gray-300" style={{ fontFamily: "sans-serif" }}>
                  I respond to every message personally.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 text-sm
                    uppercase tracking-[0.2em] hover:bg-black transition-all duration-300
                    active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {submitting ? "Sending..." : "Send Message"}
                  {!submitting && (
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gray-200" />
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300" style={{ fontFamily: "sans-serif" }}>
            Axentra · Professional Network
          </p>
          <div className="h-px w-8 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}