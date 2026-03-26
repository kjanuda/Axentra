"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTag = "All" | "Hardware" | "Software" | "Security" | "Testing";

type ResearchCard = {
  id: string;
  tag: FilterTag;
  phase: string;
  title: string;
  abstract: string;
  findings: string[];
  date: string;
  status: "Complete" | "In Progress" | "Planned";
  img: string;
};

type TimelineEntry = {
  phase: string;
  title: string;
  desc: string;
  date: string;
  status: "Complete" | "In Progress" | "Planned";
};

type ChartBar = { label: string; value: number; max: number; color: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESEARCH_CARDS: ResearchCard[] = [
  {
    id: "r1",
    tag: "Hardware",
    phase: "Phase 01",
    title: "ESP32 Microcontroller Evaluation",
    abstract:
      "Comparative analysis of ESP32 against Arduino Mega and Raspberry Pi Zero for vehicle IoT deployment. Evaluated power consumption, dual-core processing capability, built-in Wi-Fi/Bluetooth, and operating temperature range for automotive environments.",
    findings: [
      "ESP32 consumes 240 mA peak vs 400 mA for RPi Zero",
      "Dual-core 240 MHz enables concurrent GPS + GSM handling",
      "Operating range –40°C to 85°C suitable for in-vehicle use",
      "Native SPI/I2C/UART reduces external component count",
    ],
    date: "Jan 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: "r2",
    tag: "Hardware",
    phase: "Phase 01",
    title: "GPS Module Accuracy Testing",
    abstract:
      "Field testing of NEO-6M GPS module across urban, suburban, and highway environments. Measured Time To First Fix (TTFF), positional accuracy under tree canopy and tall buildings, and update frequency stability over 72-hour continuous operation.",
    findings: [
      "Cold start TTFF: 27 seconds average in open sky",
      "Positional accuracy: ±2.5m in open, ±8m urban canyon",
      "Hot start TTFF: 1 second after initial lock",
      "72h continuous operation: zero module resets recorded",
    ],
    date: "Jan 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80",
  },
  {
    id: "r3",
    tag: "Hardware",
    phase: "Phase 02",
    title: "GSM/4G Connectivity Reliability",
    abstract:
      "Evaluation of SIM800L module for vehicle tracking data transmission. Tested packet loss rate, reconnection time after signal drop, and data throughput across different carrier networks in Sri Lanka.",
    findings: [
      "Packet loss under 0.3% on major carrier networks",
      "Average reconnection time after signal loss: 4.2 seconds",
      "GPS payload (52 bytes) transmitted in under 200ms",
      "Tested across Dialog, Mobitel, and Hutch networks",
    ],
    date: "Feb 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
  },
  {
    id: "r4",
    tag: "Software",
    phase: "Phase 02",
    title: "Real-Time Data Pipeline Architecture",
    abstract:
      "Design and benchmarking of the server-side data pipeline for ingesting, processing, and distributing GPS and vehicle state events. Explored WebSocket vs polling approaches for dashboard delivery and evaluated database options for time-series location storage.",
    findings: [
      "WebSocket reduces dashboard latency from 2.1s to 0.18s vs polling",
      "Firebase Realtime DB handles 1,200 concurrent connections in tests",
      "GPS event throughput: 480 events/sec with single server instance",
      "Location history query P99 latency: 34ms for 30-day range",
    ],
    date: "Feb 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    id: "r5",
    tag: "Security",
    phase: "Phase 03",
    title: "Authentication Architecture Research",
    abstract:
      "Investigation into multi-factor authentication approaches for vehicle security dashboards. Compared session-token, JWT, and OAuth 2.0 patterns. Researched IP-based access control as a second authentication factor and evaluated existing academic literature on IoT dashboard security.",
    findings: [
      "OAuth 2.0 + IP whitelist provides defence-in-depth with minimal UX friction",
      "JWT tokens with 15-minute expiry reduce replay attack window by 94%",
      "IP whitelist blocks 99.7% of credential-stuffing attempts in simulation",
      "Session hijacking risk reduced by binding token to originating IP",
    ],
    date: "Mar 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    id: "r6",
    tag: "Security",
    phase: "Phase 03",
    title: "Data Encryption in Transit",
    abstract:
      "Analysis of encryption overhead on ESP32 for vehicle-to-server communication. Evaluated TLS 1.3 implementation options, AES-128 vs AES-256 performance trade-offs on microcontroller hardware, and certificate management strategies for embedded systems.",
    findings: [
      "TLS 1.3 handshake on ESP32: 340ms average — acceptable for session init",
      "AES-128 encryption adds 1.8ms per GPS payload on ESP32",
      "AES-256 adds 3.1ms — chosen for security margin despite minor overhead",
      "Self-signed cert with pinning used to prevent MITM attacks",
    ],
    date: "Mar 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    id: "r7",
    tag: "Testing",
    phase: "Phase 04",
    title: "Field Testing — Theft Simulation",
    abstract:
      "Controlled theft simulation tests across three scenarios: parking lot movement, engine ignition attempt, and extended vehicle displacement. Measured end-to-end alert latency from motion trigger to owner notification, and remote engine-disable response time.",
    findings: [
      "Alert latency (motion → owner SMS): 3.8 seconds average",
      "False positive rate from road vibration: 0.4% — acceptable threshold",
      "Remote engine disable response: 1.2 seconds from dashboard action",
      "GPS location accuracy during movement: ±3.1m average",
    ],
    date: "Apr 2024",
    status: "Complete",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
  },
  {
    id: "r8",
    tag: "Testing",
    phase: "Phase 04",
    title: "Long-Duration System Reliability",
    abstract:
      "30-day continuous operation test of the full Axentra hardware stack installed in a test vehicle. Monitored uptime, GPS lock continuity, GSM reconnection events, memory usage over time, and thermal behaviour of the ESP32 enclosure under Sri Lankan climate conditions.",
    findings: [
      "System uptime: 99.2% over 30-day test period",
      "Total GSM reconnections: 14 — all recovered within 6 seconds",
      "ESP32 enclosure peak temperature: 52°C — within safe operating range",
      "No memory leak detected — heap stable at 68% across 30 days",
    ],
    date: "May 2024",
    status: "In Progress",
    img: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&q=80",
  },
];

const TIMELINE: TimelineEntry[] = [
  {
    phase: "01",
    title: "Component Research & Selection",
    desc: "Evaluated microcontrollers, GPS modules, and GSM hardware. Finalised ESP32 + NEO-6M + SIM800L stack based on power, cost, and performance analysis.",
    date: "Jan 2024",
    status: "Complete",
  },
  {
    phase: "02",
    title: "System Architecture & Prototyping",
    desc: "Designed data pipeline from vehicle sensors to cloud. Built first breadboard prototype and validated GPS tracking and GSM transmission end-to-end.",
    date: "Feb 2024",
    status: "Complete",
  },
  {
    phase: "03",
    title: "Security Layer Implementation",
    desc: "Implemented Google OAuth 2.0 + IP whitelisting authentication. Added AES-256 encryption for all vehicle-to-server data and JWT-based session management.",
    date: "Mar 2024",
    status: "Complete",
  },
  {
    phase: "04",
    title: "Field Testing & Validation",
    desc: "Conducted controlled theft simulations, measured alert latency and remote control response times. Running 30-day continuous reliability test.",
    date: "Apr – May 2024",
    status: "In Progress",
  },
  {
    phase: "05",
    title: "Documentation & Final Report",
    desc: "Compile all findings, test data, and technical documentation into final project report. Prepare demonstration for evaluation panel.",
    date: "Jun 2024",
    status: "Planned",
  },
];

const CHART_DATA: ChartBar[] = [
  { label: "GPS Accuracy (urban)", value: 92, max: 100, color: "#0F6E56" },
  { label: "GPS Accuracy (open)", value: 98, max: 100, color: "#0F6E56" },
  { label: "Alert Latency score", value: 87, max: 100, color: "#534AB7" },
  { label: "GSM Reliability", value: 97, max: 100, color: "#534AB7" },
  { label: "System Uptime", value: 99, max: 100, color: "#185FA5" },
  { label: "Auth Security score", value: 96, max: 100, color: "#185FA5" },
  { label: "False Positive rate", value: 4, max: 100, color: "#993C1D" },
  { label: "Encryption overhead", value: 3, max: 100, color: "#993C1D" },
];

const FILTERS: FilterTag[] = ["All", "Hardware", "Software", "Security", "Testing"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ResearchCard["status"] }) {
  const styles: Record<string, string> = {
    Complete:    "bg-green-50 text-green-700 border-green-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    Planned:     "bg-gray-100 text-gray-500 border-gray-200",
  };
  const dots: Record<string, string> = {
    Complete:    "bg-green-500",
    "In Progress": "bg-amber-500",
    Planned:     "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] border ${styles[status]}`}
      style={{ fontFamily: "sans-serif" }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

function ResearchCardItem({ card }: { card: ResearchCard }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
      style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "sans-serif" }}
        >
          {card.tag}
        </div>
        <div
          className="absolute top-4 left-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] text-gray-400"
          style={{ fontFamily: "sans-serif" }}
        >
          {card.phase}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-lg font-normal text-gray-900 leading-snug"
            style={{ letterSpacing: "-0.01em" }}
          >
            {card.title}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-4">
          <StatusBadge status={card.status} />
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-gray-400"
            style={{ fontFamily: "sans-serif" }}
          >
            {card.date}
          </span>
        </div>

        {/* Abstract — collapsed / expanded */}
        <p
          className="text-sm text-gray-500 leading-relaxed mb-4"
          style={{ fontFamily: "sans-serif" }}
        >
          {open ? card.abstract : `${card.abstract.slice(0, 120)}…`}
        </p>

        {/* Findings (shown when open) */}
        {open && (
          <div className="border-t border-gray-100 pt-4 mb-4">
            <p
              className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-3"
              style={{ fontFamily: "sans-serif" }}
            >
              Key Findings
            </p>
            <div className="space-y-2">
              {card.findings.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                  style={{ fontFamily: "sans-serif" }}
                >
                  <div className="w-1 h-1 bg-gray-400 mt-2 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors duration-200"
          style={{ fontFamily: "sans-serif" }}
        >
          <span>{open ? "Collapse" : "Read Abstract"}</span>
          <div
            className="transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

function TimelineSection() {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <div
      className="bg-white border border-gray-200 p-8 md:p-10"
      style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="w-2 h-2 bg-gray-900" />
        <h3
          className="text-2xl font-normal text-gray-900"
          style={{ letterSpacing: "-0.01em" }}
        >
          Research Timeline
        </h3>
      </div>

      <div className="space-y-0">
        {TIMELINE.map((entry, idx) => {
          const isActive = activePhase === entry.phase;
          const isLast = idx === TIMELINE.length - 1;
          return (
            <div key={entry.phase} className="relative flex gap-6">
              {/* Left: phase + line */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setActivePhase(isActive ? null : entry.phase)}
                  className={`w-12 h-12 border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "border-gray-900 bg-gray-900"
                      : entry.status === "Complete"
                      ? "border-gray-900 bg-white hover:bg-gray-900 hover:text-white"
                      : entry.status === "In Progress"
                      ? "border-amber-500 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <span
                    className={`text-sm font-normal transition-colors ${
                      isActive ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {entry.phase}
                  </span>
                </button>
                {!isLast && (
                  <div
                    className={`w-px flex-1 mt-1 mb-1 min-h-[40px] transition-colors duration-300 ${
                      entry.status === "Complete" ? "bg-gray-900" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}>
                <div className="flex flex-wrap items-center gap-3 mb-2 pt-2">
                  <h4
                    className="text-base font-normal text-gray-900"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {entry.title}
                  </h4>
                  <StatusBadge status={entry.status} />
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] text-gray-400"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {entry.date}
                  </span>
                </div>
                <p
                  className={`text-sm text-gray-500 leading-relaxed overflow-hidden transition-all duration-500 ${
                    isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  {entry.desc}
                </p>
                {!isActive && (
                  <p
                    className="text-sm text-gray-400 leading-relaxed"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {entry.desc.slice(0, 80)}…
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartsSection() {
  const positive = CHART_DATA.filter((_, i) => i < 6);
  const negative = CHART_DATA.filter((_, i) => i >= 6);

  return (
    <div
      className="bg-white border border-gray-200 p-8 md:p-10"
      style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 bg-gray-900" />
        <h3
          className="text-2xl font-normal text-gray-900"
          style={{ letterSpacing: "-0.01em" }}
        >
          Test Results & Performance Data
        </h3>
      </div>
      <p
        className="text-sm text-gray-500 mb-10 ml-5"
        style={{ fontFamily: "sans-serif" }}
      >
        Aggregated scores from Phase 01–04 field testing. Higher is better for performance
        metrics; lower is better for error/overhead metrics.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Performance metrics */}
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6"
            style={{ fontFamily: "sans-serif" }}
          >
            Performance Metrics (%)
          </p>
          <div className="space-y-5">
            {positive.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span
                    className="text-xs text-gray-600"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {bar.label}
                  </span>
                  <span
                    className="text-sm font-normal text-gray-900"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {bar.value}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 w-full">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${(bar.value / bar.max) * 100}%`,
                      background: bar.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error / overhead metrics */}
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6"
            style={{ fontFamily: "sans-serif" }}
          >
            Error / Overhead Metrics (%) — lower is better
          </p>
          <div className="space-y-5">
            {negative.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span
                    className="text-xs text-gray-600"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {bar.label}
                  </span>
                  <span
                    className="text-sm font-normal text-gray-900"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {bar.value}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 w-full">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${(bar.value / bar.max) * 100}%`,
                      background: bar.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { label: "Alert Latency", value: "3.8s", sub: "motion → SMS" },
              { label: "Engine Disable", value: "1.2s", sub: "remote response" },
              { label: "GPS Update", value: "3–5s", sub: "refresh interval" },
              { label: "System Uptime", value: "99.2%", sub: "30-day test" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 border border-gray-200 p-4"
              >
                <p
                  className="text-[9px] uppercase tracking-[0.35em] text-gray-400 mb-1"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-normal text-gray-900"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[10px] text-gray-400 mt-0.5"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Progress Log ─────────────────────────────────────────────────────────────

const PROGRESS_LOGS = [
  {
    date: "15 May 2024",
    tag: "Testing",
    entry:
      "Day 20 of 30-day reliability test completed. System uptime tracking at 99.2%. One unexpected GSM dropout at 03:14 — recovered in 4.8s. Heap memory stable.",
  },
  {
    date: "02 May 2024",
    tag: "Testing",
    entry:
      "Theft simulation batch 3 complete. Alert latency improved to 3.8s after optimising GSM queue flush interval. Remote engine disable averaging 1.2s.",
  },
  {
    date: "28 Mar 2024",
    tag: "Security",
    entry:
      "IP whitelisting implemented and tested against 500 simulated credential-stuffing attempts. Block rate 99.7%. JWT refresh cycle set to 15 minutes.",
  },
  {
    date: "14 Mar 2024",
    tag: "Security",
    entry:
      "AES-256 encryption integrated into ESP32 firmware. Overhead benchmarked at 3.1ms per payload — within acceptable threshold. TLS 1.3 handshake stable at 340ms.",
  },
  {
    date: "22 Feb 2024",
    tag: "Software",
    entry:
      "Switched dashboard from HTTP polling to WebSocket. Latency dropped from 2.1s to 0.18s. Firebase Realtime DB selected as primary data store after load testing.",
  },
  {
    date: "08 Jan 2024",
    tag: "Hardware",
    entry:
      "NEO-6M GPS field test complete. Cold start TTFF 27s, hot start 1s. Urban canyon accuracy ±8m — acceptable for theft detection use case. Module confirmed.",
  },
];

function ProgressLog() {
  return (
    <div
      className="bg-white border border-gray-200 p-8 md:p-10"
      style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="w-2 h-2 bg-gray-900" />
        <h3
          className="text-2xl font-normal text-gray-900"
          style={{ letterSpacing: "-0.01em" }}
        >
          Progress Log
        </h3>
      </div>

      <div className="space-y-0">
        {PROGRESS_LOGS.map((log, idx) => (
          <div
            key={idx}
            className="group flex gap-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200 -mx-2 px-2"
          >
            {/* Date */}
            <div className="flex-shrink-0 w-28">
              <p
                className="text-[10px] uppercase tracking-[0.3em] text-gray-400 pt-0.5"
                style={{ fontFamily: "sans-serif" }}
              >
                {log.date}
              </p>
            </div>
            {/* Tag */}
            <div className="flex-shrink-0 w-20">
              <span
                className="text-[9px] uppercase tracking-[0.25em] px-2 py-1 bg-gray-100 text-gray-500"
                style={{ fontFamily: "sans-serif" }}
              >
                {log.tag}
              </span>
            </div>
            {/* Entry */}
            <p
              className="text-sm text-gray-600 leading-relaxed flex-1"
              style={{ fontFamily: "sans-serif" }}
            >
              {log.entry}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Research() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");
  const [activeSection, setActiveSection] = useState<
    "findings" | "timeline" | "data" | "log"
  >("findings");

  const filtered =
    activeFilter === "All"
      ? RESEARCH_CARDS
      : RESEARCH_CARDS.filter((c) => c.tag === activeFilter);

  return (
    <div
      className="min-h-screen px-4 py-16 relative"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#faf9f7",
      }}
    >
      {/* Diagonal texture — matches LearnMore */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg, #000 0px, #000 1px, transparent 1px, transparent 12px
          )`,
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-gray-400" />
            <p
              className="text-[10px] uppercase tracking-[0.5em] text-gray-400"
              style={{ fontFamily: "sans-serif" }}
            >
              Research
            </p>
          </div>
          <h1
            className="text-6xl md:text-8xl font-normal text-gray-900 leading-[0.95] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Findings &amp;
          </h1>
          <h1
            className="text-6xl md:text-8xl font-normal text-gray-900 leading-[0.95] mb-8 italic"
            style={{ letterSpacing: "-0.03em" }}
          >
            Documentation.
          </h1>
          <p
            className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed"
            style={{ fontFamily: "sans-serif" }}
          >
            Project research, field-test findings, performance benchmarks, and
            development logs for the Axentra IoT vehicle security system.
          </p>
        </div>

        {/* ── Stats row ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { n: "08", label: "Research Papers" },
            { n: "04", label: "Test Phases" },
            { n: "30", label: "Days Field Test" },
            { n: "99.2%", label: "System Uptime" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 p-6"
              style={{ boxShadow: "2px 2px 0px #e5e7eb" }}
            >
              <p
                className="text-4xl font-normal text-gray-900 mb-1"
                style={{ letterSpacing: "-0.03em" }}
              >
                {s.n}
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.35em] text-gray-400"
                style={{ fontFamily: "sans-serif" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Section Tabs ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-12">
          {(
            [
              { id: "findings", label: "Research Findings" },
              { id: "timeline", label: "Timeline" },
              { id: "data", label: "Test Data" },
              { id: "log", label: "Progress Log" },
            ] as { id: typeof activeSection; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition-all duration-300"
              style={{
                fontFamily: "sans-serif",
                background: activeSection === tab.id ? "#111827" : "#ffffff",
                color: activeSection === tab.id ? "#ffffff" : "#6b7280",
                border:
                  activeSection === tab.id
                    ? "1px solid #111827"
                    : "1px solid #e5e7eb",
                boxShadow:
                  activeSection === tab.id
                    ? "2px 2px 0px #d1d5db"
                    : "2px 2px 0px #e5e7eb",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── FINDINGS SECTION ───────────────────────────────────────── */}
        {activeSection === "findings" && (
          <div>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition-all duration-200"
                  style={{
                    fontFamily: "sans-serif",
                    background: activeFilter === f ? "#374151" : "transparent",
                    color: activeFilter === f ? "#fff" : "#9ca3af",
                    border:
                      activeFilter === f
                        ? "1px solid #374151"
                        : "1px solid #e5e7eb",
                  }}
                >
                  {f}
                  {f !== "All" && (
                    <span className="ml-1.5 opacity-60">
                      ({RESEARCH_CARDS.filter((c) => c.tag === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Cards grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filtered.map((card) => (
                <ResearchCardItem key={card.id} card={card} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p
                  className="text-gray-400 text-sm"
                  style={{ fontFamily: "sans-serif" }}
                >
                  No papers in this category yet.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── TIMELINE SECTION ───────────────────────────────────────── */}
        {activeSection === "timeline" && <TimelineSection />}

        {/* ── DATA SECTION ───────────────────────────────────────────── */}
        {activeSection === "data" && <ChartsSection />}

        {/* ── LOG SECTION ────────────────────────────────────────────── */}
        {activeSection === "log" && <ProgressLog />}

        {/* ── Technical Docs strip ───────────────────────────────────── */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Hardware Specification",
              desc: "Component datasheets, wiring diagrams, and PCB layout documentation for the Axentra hardware stack.",
              tag: "PDF · 2.4 MB",
            },
            {
              title: "API Reference",
              desc: "REST and WebSocket API endpoints for vehicle data ingestion, dashboard queries, and remote command delivery.",
              tag: "Docs",
            },
            {
              title: "Test Data Archive",
              desc: "Raw CSV exports from all field testing phases — GPS logs, alert timestamps, and reliability metrics.",
              tag: "CSV · 18 MB",
            },
          ].map((doc, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-200 p-7 transition-all duration-300 hover:border-gray-900 cursor-pointer"
              style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-8 h-8 border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-gray-400 group-hover:text-gray-900 transition-colors"
                  >
                    <path
                      d="M2 2h7l3 3v7H2V2z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <span
                  className="text-[9px] uppercase tracking-[0.3em] text-gray-400"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {doc.tag}
                </span>
              </div>
              <h4
                className="text-base font-normal text-gray-900 mb-2"
                style={{ letterSpacing: "-0.01em" }}
              >
                {doc.title}
              </h4>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: "sans-serif" }}
              >
                {doc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gray-200" />
          <p
            className="text-[9px] uppercase tracking-[0.4em] text-gray-300"
            style={{ fontFamily: "sans-serif" }}
          >
            Axentra · IoT Vehicle Security
          </p>
          <div className="h-px w-8 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}