"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Modal state
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const emailParam = params.get("email");
    const nameParam = params.get("name");
    const photoParam = params.get("photo");
    
    if (emailParam) setEmail(emailParam);
    if (nameParam) setName(nameParam);
    if (photoParam) setPhoto(photoParam);
    
    // Check if vehicle is already connected (from localStorage)
    const connected = localStorage.getItem(`vehicle_connected_${emailParam}`);
    if (connected === "true") {
      setIsConnected(true);
    }
    
    setMounted(true);
  }, [params]);

  const handleConnect = async () => {
    if (!deviceId.trim() || !vehicleName.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsConnecting(true);

    try {
      const response = await fetch("http://localhost:4000/vehicle/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          deviceId: deviceId.trim(),
          name: vehicleName.trim(),
        }),
      });

      if (response.ok) {
        // Save connection status
        localStorage.setItem(`vehicle_connected_${email}`, "true");
        setIsConnected(true);
        setShowConnectModal(false);
        setDeviceId("");
        setVehicleName("");
        
        // Success feedback
        alert("🚗 Vehicle Connected Successfully!");
      } else {
        alert("Failed to connect vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Error connecting vehicle. Please check your connection.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <header className={`mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3 bg-gradient-to-r from-white via-cyan-100 to-cyan-200 bg-clip-text text-transparent">
                Command Center
              </h1>
              <p className="text-slate-400 text-lg">Manage your connected vehicle ecosystem</p>
            </div>

            {/* User profile */}
            {(email || photo) && (
              <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 hover:bg-white/10 transition-all duration-300">
                {photo ? (
                  <img 
                    src={photo} 
                    alt={name || email} 
                    className="w-12 h-12 rounded-full ring-2 ring-cyan-400/50"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-lg font-bold">
                    {(name || email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{name || email.split('@')[0]}</p>
                  <p className="text-xs text-slate-400">{email}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-1">{isConnected ? "1" : "0"}</h3>
              <p className="text-slate-400 text-sm">Connected Vehicles</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-1">Active</h3>
              <p className="text-slate-400 text-sm">Security Status</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-emerald-400/50 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-1">0h</h3>
              <p className="text-slate-400 text-sm">Total Drive Time</p>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Connect Vehicle Card - Shows when NOT connected */}
            {!isConnected && (
              <button 
                onClick={() => setShowConnectModal(true)}
                className="group relative bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-500 hover:scale-[1.02] overflow-hidden text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">Start</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Connect Vehicle</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Add a new vehicle to your fleet and start monitoring in real-time
                  </p>
                </div>
              </button>
            )}

            {/* View Fleet Card - Shows when connected */}
            {isConnected && (
              <Link 
                href={`/fleet?email=${email}`}
                className="group relative bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 hover:border-blue-400 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/5 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">View</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">View Fleet</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Monitor all your connected vehicles from a single dashboard
                  </p>
                </div>
              </Link>
            )}

            {/* Analytics Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden opacity-60 cursor-not-allowed">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full">
                    Coming Soon
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Analytics</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Deep insights into your driving patterns and vehicle health
                </p>
              </div>
            </div>

            {/* Settings Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden opacity-60 cursor-not-allowed">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full">
                    Coming Soon
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Settings</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Customize notifications, alerts, and security preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-slate-500 text-sm">
            Powered by Axentra IoT Platform • Secure • Real-time Monitoring
          </p>
        </div>
      </div>

      {/* Connect Vehicle Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slideUp">
            {/* Close button */}
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal header */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">Connect Vehicle</h2>
              <p className="text-slate-400 text-sm">Enter your device details to start monitoring</p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Device ID
                </label>
                <input
                  type="text"
                  placeholder="e.g., AXNT-2024-001"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., My Tesla Model 3"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-xl font-medium shadow-lg shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}