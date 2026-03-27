"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

const BACKEND_URL = "https://axentra-backend-production-e185.up.railway.app";

function DashboardContent() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [mounted, setMounted] = useState(false);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isCheckingServer, setIsCheckingServer] = useState(false);

  useEffect(() => {
    const emailParam = params.get("email") || "";
    const nameParam  = params.get("name")  || "";
    const photoParam = params.get("photo") || "";

    const decodedEmail = decodeURIComponent(emailParam);
    const decodedName  = decodeURIComponent(nameParam);
    const decodedPhoto = decodeURIComponent(photoParam);

    setEmail(decodedEmail);
    setName(decodedName);
    setPhoto(decodedPhoto);

    const connected = localStorage.getItem(`vehicle_connected_${decodedEmail}`);
    if (connected === "true") setIsConnected(true);

    setMounted(true);
  }, [params]);

  const handleAddVehicleClick = async () => {
    setIsCheckingServer(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`${BACKEND_URL}/health`, {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) throw new Error("Server error");
      setShowConnectModal(true);
    } catch {
      alert("⚠️ You are not connected to the Axentra system.\n\nPlease make sure the Axentra server is running and try again.");
    } finally {
      setIsCheckingServer(false);
    }
  };

  const handleConnect = async () => {
    if (!deviceId.trim() || !vehicleName.trim()) {
      alert("Please fill in all fields");
      return;
    }
    setIsConnecting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/vehicle/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          deviceId: deviceId.trim(),
          name: vehicleName.trim(),
        }),
      });
      if (response.ok) {
        localStorage.setItem(`vehicle_connected_${email}`, "true");
        setIsConnected(true);
        setShowConnectModal(false);
        setDeviceId("");
        setVehicleName("");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* ── Header ── */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* logo placeholder */}
            </div>

            {(email || photo) && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-200">
                {photo ? (
                  <img
                    src={photo}
                    alt={name || email}
                    className="w-8 h-8 rounded-full ring-2 ring-cyan-500/30 object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const s = t.nextElementSibling as HTMLElement;
                      if (s) s.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 items-center justify-center text-xs font-bold text-white"
                  style={{ display: photo ? "none" : "flex" }}
                >
                  {(name || email || "U")[0].toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-xs text-gray-900 leading-tight">{name || email.split("@")[0]}</p>
                  <p className="text-[10px] text-gray-500 leading-tight">{email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── Welcome ── */}
        <div className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Welcome back, {name ? name.split(" ")[0] : email ? email.split("@")[0] : "there"}! 👋
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">Here&apos;s what&apos;s happening with your vehicles today</p>
        </div>

        {/* ── Quick Stats ── */}
        <div className={`grid grid-cols-3 gap-3 sm:gap-4 mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>

          {/* Stat 1 */}
          <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-cyan-100 text-cyan-700 rounded-full hidden sm:inline">Active</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">{isConnected ? "1" : "0"}</h3>
            <p className="text-gray-500 text-[11px] sm:text-xs font-medium leading-tight">Connected Vehicles</p>
          </div>

          {/* Stat 2 */}
          <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-semibold text-emerald-700">Secure</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">100%</h3>
            <p className="text-gray-500 text-[11px] sm:text-xs font-medium leading-tight">Security Level</p>
          </div>

          {/* Stat 3 */}
          <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">
              0<span className="text-sm text-gray-400">h</span>
            </h3>
            <p className="text-gray-500 text-[11px] sm:text-xs font-medium leading-tight">Total Drive Time</p>
          </div>

        </div>

        {/* ── Quick Actions ── */}
        <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Quick Actions</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            {/* Add New Vehicle */}
            <button
              onClick={handleAddVehicleClick}
              disabled={isCheckingServer}
              className="group relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-5 text-left overflow-hidden hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-400 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-wait disabled:scale-100"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {isCheckingServer ? (
                      <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-white group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-xs font-medium">{isCheckingServer ? "Checking..." : "Start Now"}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Add New Vehicle</h3>
                <p className="text-white/75 text-xs leading-relaxed">
                  Connect a vehicle and start monitoring with IoT sensors
                </p>
              </div>
            </button>

            {/* View Fleet */}
            {isConnected ? (
              <Link
                href={`/fleet?email=${email}`}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-5 overflow-hidden hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/15 transition-all duration-400 hover:scale-[1.02]"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-full -translate-y-14 translate-x-14"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs font-medium">Open</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">View Fleet</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Monitor all connected vehicles from one dashboard
                  </p>
                </div>
              </Link>
            ) : (
              <div
                className="group relative bg-white border-2 border-dashed border-gray-200 rounded-xl p-5 overflow-hidden cursor-not-allowed opacity-55"
                title="Connect a vehicle first to unlock"
              >
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Connect first
                </div>
                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">View Fleet</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Connect your first vehicle to unlock fleet monitoring
                  </p>
                </div>
              </div>
            )}

            {/* Analytics — Coming Soon */}
            <div className="group relative bg-white border border-gray-200 rounded-xl p-5 overflow-hidden opacity-55 cursor-not-allowed">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Analytics</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Deep insights into driving patterns and vehicle health
                </p>
              </div>
            </div>

            {/* Settings — Coming Soon */}
            <div className="group relative bg-white border border-gray-200 rounded-xl p-5 overflow-hidden opacity-55 cursor-not-allowed">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Settings</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Customize notifications, alerts, and security preferences
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div className={`mt-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">No Activity Yet</h4>
              <p className="text-gray-400 text-xs max-w-xs mx-auto">
                Connect your first vehicle to start seeing real-time activity and monitoring data
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={`mt-10 text-center transition-all duration-700 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Powered by Axentra IoT Platform</span>
            <span className="text-gray-300">•</span>
            <span>Secure &amp; Real-time</span>
          </div>
        </div>
      </div>

      {/* ── Connect Vehicle Modal ── */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slideUp border border-gray-100">
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Connect Vehicle</h2>
              <p className="text-gray-500 text-sm">Enter your device details to start monitoring</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Device ID</label>
                <input
                  type="text"
                  placeholder="e.g., AXNT-2024-001"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Vehicle Name</label>
                <input
                  type="text"
                  placeholder="e.g., My Tesla Model 3"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn  { animation: fadeIn  0.25s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s ease-out; }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm font-medium">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}