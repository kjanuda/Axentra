"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ConnectVehicle() {
  const params = useSearchParams();
  const email = params.get("email");

  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");

  const handleConnect = async () => {
    await fetch("http://localhost:4000/vehicle/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
        deviceId,
        name,
      }),
    });

    alert("Vehicle Connected 🚗");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">Connect Vehicle</h1>

      <input
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        className="block mb-4 p-2 text-black"
      />

      <input
        placeholder="Vehicle Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block mb-4 p-2 text-black"
      />

      <button
        onClick={handleConnect}
        className="bg-green-500 px-6 py-3 rounded"
      >
        Connect
      </button>
    </div>
  );
}