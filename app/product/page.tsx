"use client";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Axentra Features</h1>

      <div className="grid gap-6">
        <div>🔐 Live Tracking (Map Demo)</div>
        <div>🚨 Theft Alerts</div>
        <div>📱 Mobile App Preview</div>
        <div>⚙️ ESP32 + GPS + GSM</div>
      </div>

      <button
        onClick={() =>
          (window.location.href =
            "http://localhost:4000/auth/google")
        }
        className="mt-10 bg-green-500 px-6 py-3 rounded-lg"
      >
        Connect Your Vehicle
      </button>
    </div>
  );
}