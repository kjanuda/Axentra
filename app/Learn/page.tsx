"use client";

import { useState } from "react";

export default function LearnMore() {
  const [activeSection, setActiveSection] = useState("features");
  const [focused, setFocused] = useState<string | null>(null);

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
      <div className="relative w-full max-w-6xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-gray-400" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400" style={{ fontFamily: "sans-serif" }}>
              Learn More
            </p>
          </div>
          <h1
            className="text-6xl md:text-8xl font-normal text-gray-900 leading-[0.95] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Secure Your
          </h1>
          <h1
            className="text-6xl md:text-8xl font-normal text-gray-900 leading-[0.95] mb-8 italic"
            style={{ letterSpacing: "-0.03em" }}
          >
            Vehicle.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed" style={{ fontFamily: "sans-serif" }}>
            Smart IoT-based vehicle security system designed to protect your car in real time. 
            Powered by ESP32, GPS, and GSM/4G connectivity for live tracking and instant alerts.
          </p>
        </div>

        {/* ── Navigation Tabs ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { id: "features", label: "Key Features" },
            { id: "how-it-works", label: "How It Works" },
            { id: "dashboard", label: "Dashboard Access" },
            { id: "benefits", label: "Benefits" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition-all duration-300"
              style={{
                fontFamily: "sans-serif",
                background: activeSection === tab.id ? "#111827" : "#ffffff",
                color: activeSection === tab.id ? "#ffffff" : "#6b7280",
                border: activeSection === tab.id ? "1px solid #111827" : "1px solid #e5e7eb",
                boxShadow: activeSection === tab.id ? "2px 2px 0px #d1d5db" : "2px 2px 0px #e5e7eb",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── FEATURES SECTION ──────────────────────────────────────────── */}
        {activeSection === "features" && (
          <div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-12" style={{ letterSpacing: "-0.02em" }}>
              What You Get with Axentra
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Live Tracking */}
              <div
                className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
                style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&q=80"
                    alt="GPS Tracking"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "sans-serif" }}>
                    Live GPS
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-normal text-gray-900 mb-3" style={{ letterSpacing: "-0.01em" }}>
                    Live GPS Tracking
                  </h3>
                  <p className="text-gray-500 mb-4 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    Track your vehicle's exact location in real-time on an interactive map. 
                    See live updates every few seconds with precise coordinates.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400" style={{ fontFamily: "sans-serif" }}>Location</span>
                      <span className="text-[10px] text-green-600 flex items-center gap-1" style={{ fontFamily: "sans-serif" }}>
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        Live
                      </span>
                    </div>
                    <div className="text-sm font-mono text-gray-900">6.9271° N, 79.8612° E</div>
                    <div className="text-xs text-gray-400 mt-1" style={{ fontFamily: "sans-serif" }}>Colombo, Sri Lanka</div>
                  </div>
                </div>
              </div>

              {/* Theft Alerts */}
              <div
                className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
                style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
                    alt="Security Alerts"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "sans-serif" }}>
                    Alerts
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-normal text-gray-900 mb-3" style={{ letterSpacing: "-0.01em" }}>
                    Instant Theft Alerts
                  </h3>
                  <p className="text-gray-500 mb-4 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    Get immediate notifications when unauthorized movement is detected. 
                    Multiple alert channels ensure you're always informed.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-red-50 border border-red-200 p-3 flex items-start gap-3">
                      <div className="w-5 h-5 border border-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900" style={{ fontFamily: "sans-serif" }}>Unauthorized Movement</div>
                        <div className="text-xs text-gray-400" style={{ fontFamily: "sans-serif" }}>2 minutes ago</div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-3 flex items-start gap-3">
                      <div className="w-5 h-5 border border-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900" style={{ fontFamily: "sans-serif" }}>Engine Disabled</div>
                        <div className="text-xs text-gray-400" style={{ fontFamily: "sans-serif" }}>Remote action successful</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Dashboard */}
              <div
                className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
                style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
                    alt="Mobile App"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "sans-serif" }}>
                    Mobile
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-normal text-gray-900 mb-3" style={{ letterSpacing: "-0.01em" }}>
                    Mobile Dashboard
                  </h3>
                  <p className="text-gray-500 mb-4 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    Access your vehicle's status from anywhere. Secure login with Google 
                    authentication and IP verification for maximum security.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Google OAuth Authentication",
                      "IP Address Verification",
                      "End-to-End Encryption"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-600" style={{ fontFamily: "sans-serif" }}>
                        <div className="w-1 h-1 bg-gray-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remote Control */}
              <div
                className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
                style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
                    alt="Remote Control"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "sans-serif" }}>
                    Control
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-normal text-gray-900 mb-3" style={{ letterSpacing: "-0.01em" }}>
                    Remote Engine Control
                  </h3>
                  <p className="text-gray-500 mb-4 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    Control your vehicle remotely through the mobile app. 
                    Disable the engine instantly if theft is detected.
                  </p>
                  <div className="flex gap-3">
                    <button 
                      className="flex-1 border border-green-600 text-green-600 py-3 text-xs uppercase tracking-[0.2em] hover:bg-green-600 hover:text-white transition-all duration-300"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Enable
                    </button>
                    <button 
                      className="flex-1 bg-gray-900 text-white py-3 text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-300"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Disable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HOW IT WORKS SECTION ──────────────────────────────────────── */}
        {activeSection === "how-it-works" && (
          <div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-12" style={{ letterSpacing: "-0.02em" }}>
              How Axentra Works
            </h2>
            
            {/* Core Components */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "ESP32 Microcontroller",
                  desc: "Powerful dual-core processor that manages all sensors, GPS tracking, and wireless communication in real-time.",
                  img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
                  tag: "Hardware"
                },
                {
                  title: "GPS Module",
                  desc: "High-precision GPS receiver that provides accurate location data with coordinates updated every few seconds.",
                  img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80",
                  tag: "Tracking"
                },
                {
                  title: "GSM/4G Connectivity",
                  desc: "Cellular module that sends location data, receives commands, and delivers instant alerts to your phone.",
                  img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
                  tag: "Network"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
                  style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "sans-serif" }}>
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* System Flow */}
            <div className="bg-white border border-gray-200 p-10" style={{ boxShadow: "4px 4px 0px #e5e7eb" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-gray-900" />
                <h3 className="text-2xl font-normal text-gray-900" style={{ letterSpacing: "-0.01em" }}>
                  System Architecture
                </h3>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Vehicle Monitoring",
                    desc: "ESP32 continuously monitors vehicle sensors, GPS location, and ignition status. Motion sensors detect any unauthorized movement."
                  },
                  {
                    num: "02",
                    title: "Data Transmission",
                    desc: "GPS coordinates and vehicle status are sent via GSM/4G network to the cloud server. Data is encrypted for security."
                  },
                  {
                    num: "03",
                    title: "Dashboard Access",
                    desc: "You log in securely via Google authentication and verified IP address. View real-time location on interactive map dashboard."
                  },
                  {
                    num: "04",
                    title: "Alert & Control",
                    desc: "If theft is detected, instant alerts are sent. You can remotely disable the engine through the mobile app to prevent vehicle theft."
                  }
                ].map((step, idx) => (
                  <div key={idx}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center">
                          <span className="text-lg font-normal text-gray-900" style={{ fontFamily: "sans-serif" }}>{step.num}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-lg font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                          {step.title}
                        </h4>
                        <p className="text-gray-500 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    {idx < 3 && (
                      <div className="ml-6 mt-4 mb-4 h-8 border-l-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white border border-gray-200 p-8" style={{ boxShadow: "3px 3px 0px #e5e7eb" }}>
                <h4 className="text-lg font-normal text-gray-900 mb-6" style={{ letterSpacing: "-0.01em" }}>
                  Hardware Components
                </h4>
                <div className="space-y-3">
                  {[
                    "ESP32 Dual-Core Processor (240MHz)",
                    "NEO-6M GPS Module",
                    "SIM800L GSM/GPRS Module",
                    "Accelerometer Motion Sensor",
                    "Relay Module for Engine Control"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-600" style={{ fontFamily: "sans-serif" }}>
                      <div className="w-1 h-1 bg-gray-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-8" style={{ boxShadow: "3px 3px 0px #e5e7eb" }}>
                <h4 className="text-lg font-normal text-gray-900 mb-6" style={{ letterSpacing: "-0.01em" }}>
                  Software Features
                </h4>
                <div className="space-y-3">
                  {[
                    "Real-time GPS Tracking (3-5 sec updates)",
                    "Google OAuth 2.0 Authentication",
                    "IP Address Whitelisting",
                    "SMS & Push Notifications",
                    "Historical Location Data"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-600" style={{ fontFamily: "sans-serif" }}>
                      <div className="w-1 h-1 bg-gray-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DASHBOARD ACCESS SECTION ──────────────────────────────────── */}
        {activeSection === "dashboard" && (
          <div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-12" style={{ letterSpacing: "-0.02em" }}>
              Secure Dashboard Access
            </h2>
            
            <div className="bg-white border border-gray-200 p-10 mb-12" style={{ boxShadow: "4px 4px 0px #e5e7eb" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-gray-900" />
                <h3 className="text-2xl font-normal text-gray-900" style={{ letterSpacing: "-0.01em" }}>
                  Two-Layer Security Authentication
                </h3>
              </div>
              
              {/* Step 1: Google Login */}
              <div className="mb-12">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center">
                      <span className="text-lg font-normal" style={{ fontFamily: "sans-serif" }}>01</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xl font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                      Google Login Authentication
                    </h4>
                    <p className="text-gray-500 leading-relaxed mb-6" style={{ fontFamily: "sans-serif" }}>
                      First, you must authenticate using your Google account. This ensures only 
                      authorized users can attempt to access the dashboard.
                    </p>
                  </div>
                </div>
                
                {/* Google Login UI Mockup */}
                <div className="ml-[72px] bg-gray-50 border border-gray-200 p-8">
                  <div className="max-w-md mx-auto bg-white border border-gray-200 p-8" style={{ boxShadow: "3px 3px 0px #e5e7eb" }}>
                    <div className="text-center mb-8">
                      <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h5 className="text-xl font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                        Sign in to Axentra
                      </h5>
                      <p className="text-sm text-gray-500" style={{ fontFamily: "sans-serif" }}>
                        Secure your vehicle dashboard
                      </p>
                    </div>
                    <button 
                      className="w-full bg-gray-900 text-white py-4 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] hover:bg-black transition-colors"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-6 mb-12 h-12 border-l-2 border-gray-200" />

              {/* Step 2: IP Verification */}
              <div>
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center">
                      <span className="text-lg font-normal" style={{ fontFamily: "sans-serif" }}>02</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xl font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                      IP Address Verification
                    </h4>
                    <p className="text-gray-500 leading-relaxed mb-6" style={{ fontFamily: "sans-serif" }}>
                      After Google login, you must enter the correct whitelisted IP address. 
                      Only pre-approved IP addresses can access the dashboard.
                    </p>
                  </div>
                </div>
                
                {/* IP Verification UI Mockup */}
                <div className="ml-[72px] bg-gray-50 border border-gray-200 p-8">
                  <div className="max-w-md mx-auto bg-white border border-gray-200 p-8" style={{ boxShadow: "3px 3px 0px #e5e7eb" }}>
                    <div className="text-center mb-8">
                      <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                      </div>
                      <h5 className="text-xl font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                        Verify IP Address
                      </h5>
                      <p className="text-sm text-gray-500" style={{ fontFamily: "sans-serif" }}>
                        Enter authorized IP to continue
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label 
                          className="block text-[10px] uppercase tracking-[0.35em] mb-2 text-gray-400"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          IP Address
                        </label>
                        <input 
                          type="text" 
                          placeholder="192.168.1.100"
                          onFocus={(e) => setFocused("ip")}
                          onBlur={() => setFocused(null)}
                          className="w-full text-gray-900 px-5 py-3 outline-none placeholder:text-gray-300 transition-all"
                          style={{
                            fontFamily: "inherit",
                            background: focused === "ip" ? "#faf9f7" : "#f9fafb",
                            border: focused === "ip" ? "1px solid #111827" : "1px solid #e5e7eb",
                          }}
                        />
                      </div>
                      <button 
                        className="w-full bg-gray-900 text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        Verify & Access Dashboard
                      </button>
                      <div className="bg-blue-50 border border-blue-200 p-4">
                        <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                          <strong>Note:</strong> Only pre-registered IP addresses are accepted. 
                          Contact admin to whitelist new IPs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Benefits */}
            <div className="bg-white border border-gray-200 p-10" style={{ boxShadow: "4px 4px 0px #e5e7eb" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-gray-900" />
                <h3 className="text-xl font-normal text-gray-900" style={{ letterSpacing: "-0.01em" }}>
                  Why Two-Layer Security?
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Prevents Unauthorized Access",
                    desc: "Even if someone obtains your Google credentials, they cannot access the dashboard without the correct IP address."
                  },
                  {
                    title: "Location-Based Security",
                    desc: "Only access from trusted locations (home, office) is allowed, adding physical security layer."
                  },
                  {
                    title: "Activity Logging",
                    desc: "All login attempts are logged with timestamps and IP addresses for audit trails."
                  }
                ].map((benefit, idx) => (
                  <div key={idx}>
                    <h4 className="font-normal text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BENEFITS SECTION ──────────────────────────────────────────── */}
        {activeSection === "benefits" && (
          <div>
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-12" style={{ letterSpacing: "-0.02em" }}>
              Why Choose Axentra?
            </h2>
            
            {/* Hero Image */}
            <div 
              className="relative h-96 mb-12 bg-white border border-gray-200 overflow-hidden group"
              style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
            >
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80"
                alt="Vehicle Security"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="text-white text-xl md:text-2xl leading-relaxed max-w-2xl">
                  Professional-grade IoT security system designed to protect your vehicle 
                  with the latest GPS, GSM, and smart monitoring technology.
                </p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "24/7 Protection",
                  desc: "Continuous monitoring and instant alerts ensure your vehicle is protected around the clock."
                },
                {
                  title: "Instant Response",
                  desc: "React immediately to threats with remote engine control and real-time notifications."
                },
                {
                  title: "Precise Tracking",
                  desc: "Accurate GPS location with coordinates updated every few seconds for pinpoint accuracy."
                },
                {
                  title: "Easy to Use",
                  desc: "Simple mobile interface that anyone can use. No technical knowledge required."
                },
                {
                  title: "Bank-Level Security",
                  desc: "Multi-layer authentication and encryption protect your data and vehicle access."
                },
                {
                  title: "Proven Technology",
                  desc: "Built on reliable ESP32 platform with GPS and cellular connectivity that works everywhere."
                }
              ].map((benefit, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-gray-200 p-8 transition-all duration-300 hover:border-gray-900"
                  style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 border border-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gray-900" />
                    </div>
                    <h3 className="text-lg font-normal text-gray-900" style={{ letterSpacing: "-0.01em" }}>
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gray-900 border border-gray-900 p-12 text-center" style={{ boxShadow: "4px 4px 0px #6b7280" }}>
              <h3 className="text-3xl md:text-4xl font-normal text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
                Ready to Protect Your Vehicle?
              </h3>
              <p className="text-gray-300 mb-8" style={{ fontFamily: "sans-serif" }}>
                Join thousands of users who trust Axentra for vehicle security
              </p>
              <button 
                className="bg-white text-gray-900 px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "sans-serif" }}
              >
                Get Started Now
              </button>
            </div>
          </div>
        )}

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gray-200" />
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300" style={{ fontFamily: "sans-serif" }}>
            Axentra · IoT Vehicle Security
          </p>
          <div className="h-px w-8 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}