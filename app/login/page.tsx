"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-6">Axentra 🚗</h1>
      <p className="mb-8">Smart Vehicle Security System</p>

      <a
        href="/product"
        className="bg-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-600"
      >
        Get Started
      </a>
    </div>
  );
}