"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = {
  id: string;
  label: string;
  cards: { tag: string; title: string; desc: string; img: string }[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  {
    id: "hardware",
    label: "Hardware",
    cards: [
      {
        tag: "Processor",
        title: "ESP32 Dual-Core",
        desc: "240 MHz dual-core processor that manages all sensors, GPS tracking, and wireless communication in real-time.",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      },
      {
        tag: "Tracking",
        title: "NEO-6M GPS Module",
        desc: "High-precision GPS receiver providing accurate location coordinates updated every 3–5 seconds.",
        img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80",
      },
      {
        tag: "Network",
        title: "SIM800L GSM/4G",
        desc: "Cellular module that transmits encrypted location data and receives remote commands from the dashboard.",
        img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
      },
    ],
  },
  {
    id: "data-flow",
    label: "Data Flow",
    cards: [
      {
        tag: "Encryption",
        title: "Secure Transmission",
        desc: "All GPS coordinates and vehicle status data are encrypted end-to-end before being sent over the network.",
        img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      },
      {
        tag: "Cloud",
        title: "Server Processing",
        desc: "Real-time ingestion and routing of location events, ready for instant dashboard delivery.",
        img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
      },
      {
        tag: "Map",
        title: "Live Dashboard",
        desc: "Interactive map with 3–5 second location refresh and full remote control capabilities.",
        img: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&q=80",
      },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard Access",
    cards: [
      {
        tag: "Auth Layer 1",
        title: "Google OAuth 2.0",
        desc: "Secure login via your Google account — no passwords stored, identity fully verified.",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      },
      {
        tag: "Auth Layer 2",
        title: "IP Whitelisting",
        desc: "Only pre-approved IP addresses are permitted to access the dashboard after login.",
        img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      },
      {
        tag: "Logs",
        title: "Activity Audit Trail",
        desc: "Every login attempt is logged with timestamp, IP address, and outcome for full accountability.",
        img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      },
    ],
  },
  {
    id: "alert",
    label: "Alert & Control",
    cards: [
      {
        tag: "Detection",
        title: "Motion Sensor Alert",
        desc: "The accelerometer detects unauthorized movement instantly and triggers the alert pipeline.",
        img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
      },
      {
        tag: "Notification",
        title: "Instant SMS & Push",
        desc: "Multi-channel alerts reach you via SMS and push notification wherever you are.",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      },
      {
        tag: "Control",
        title: "Remote Engine Kill",
        desc: "Disable the engine remotely through the mobile dashboard — the relay cuts ignition instantly.",
        img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      },
    ],
  },
];

// ─── SVG Diagrams ─────────────────────────────────────────────────────────────

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="ax-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M2 1L8 5L2 9"
          fill="none"
          stroke="context-stroke"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

// Shared SVG node colours (Tailwind-compatible inline styles)
const C = {
  purple: { fill: "#EEEDFE", stroke: "#534AB7", text: "#3C3489" },
  teal:   { fill: "#E1F5EE", stroke: "#0F6E56", text: "#085041" },
  amber:  { fill: "#FAEEDA", stroke: "#854F0B", text: "#633806" },
  coral:  { fill: "#FAECE7", stroke: "#993C1D", text: "#712B13" },
  blue:   { fill: "#E6F1FB", stroke: "#185FA5", text: "#0C447C" },
  gray:   { fill: "#F1EFE8", stroke: "#5F5E5A", text: "#444441" },
  red:    { fill: "#FCEBEB", stroke: "#A32D2D", text: "#791F1F" },
  green:  { fill: "#EAF3DE", stroke: "#3B6D11", text: "#27500A" },
};

type NodeProps = {
  x: number; y: number; w: number; h: number;
  title: string; sub?: string;
  color: keyof typeof C;
};

function Node({ x, y, w, h, title, sub, color }: NodeProps) {
  const c = C[color];
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={6}
        fill={c.fill} stroke={c.stroke} strokeWidth={0.75}
      />
      <text
        x={x + w / 2} y={sub ? y + h / 2 - 9 : y + h / 2}
        textAnchor="middle" dominantBaseline="central"
        fontSize={13} fontWeight={500} fill={c.text}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2} y={y + h / 2 + 11}
          textAnchor="middle" dominantBaseline="central"
          fontSize={11} fill={c.stroke} style={{ fontFamily: "sans-serif" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1, y1, x2, y2, label, dashed = false,
}: {
  x1: number; y1: number; x2: number; y2: number;
  label?: string; dashed?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 10;
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#9CA3AF" strokeWidth={1}
        strokeDasharray={dashed ? "5 3" : undefined}
        markerEnd="url(#ax-arrow)"
        fill="none"
      />
      {label && (
        <text
          x={mx} y={my}
          textAnchor="middle" fontSize={10}
          fill="#9CA3AF" style={{ fontFamily: "sans-serif" }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function DiagramHardware() {
  return (
    <svg width="100%" viewBox="0 0 680 310" className="w-full">
      <ArrowDefs />
      {/* Vehicle boundary */}
      <rect x={30} y={20} width={620} height={276} rx={12}
        fill="none" stroke="#D1D5DB" strokeWidth={0.5} strokeDasharray="6 4" />
      <text x={50} y={44} fontSize={9} fill="#9CA3AF"
        letterSpacing="0.4em" style={{ fontFamily: "sans-serif" }}>
        VEHICLE
      </text>
      {/* GPS left */}
      <Node x={52} y={120} w={148} h={80} title="GPS Module" sub="NEO-6M · 3–5 sec" color="teal" />
      <Arrow x1={200} y1={160} x2={256} y2={160} label="coords" />
      {/* Accelerometer top */}
      <Node x={258} y={44} w={164} h={60} title="Accelerometer" sub="Motion detection" color="amber" />
      <Arrow x1={340} y1={104} x2={340} y2={118} />
      {/* ESP32 center */}
      <Node x={258} y={120} w={164} h={80} title="ESP32" sub="Dual-core controller" color="purple" />
      {/* Relay bottom */}
      <Node x={258} y={218} w={164} h={60} title="Relay Module" sub="Engine cut-off" color="coral" />
      <Arrow x1={340} y1={200} x2={340} y2={216} />
      {/* GSM right */}
      <Node x={476} y={120} w={156} h={80} title="GSM / 4G" sub="SIM800L · cellular" color="blue" />
      <Arrow x1={422} y1={160} x2={474} y2={160} label="data" />
    </svg>
  );
}

function DiagramDataFlow() {
  return (
    <svg width="100%" viewBox="0 0 680 360" className="w-full">
      <ArrowDefs />
      <Node x={40}  y={60} w={160} h={80} title="Vehicle Sensors" sub="GPS · motion · ignition" color="teal" />
      <Arrow x1={200} y1={100} x2={256} y2={100} label="raw data" />
      <Node x={258} y={60} w={164} h={80} title="ESP32 + GSM" sub="Encrypt & transmit" color="purple" />
      <Arrow x1={422} y1={100} x2={476} y2={100} label="4G / GSM" />
      <Node x={478} y={60} w={162} h={80} title="Cloud Server" sub="Ingest · store · route" color="blue" />
      {/* Cloud → Dashboard */}
      <Arrow x1={559} y1={140} x2={559} y2={196} label="push" />
      <Node x={478} y={198} w={162} h={80} title="Live Dashboard" sub="Map · alerts · control" color="amber" />
      <Arrow x1={476} y1={238} x2={424} y2={238} label="view" />
      <Node x={258} y={198} w={164} h={80} title="Owner" sub="View · remote control" color="gray" />
      {/* Feedback loop */}
      <path
        d="M340 278 L340 318 L559 318 L559 280"
        fill="none" stroke="#9CA3AF" strokeWidth={1}
        strokeDasharray="5 3" markerEnd="url(#ax-arrow)"
      />
      <text x={450} y={334} fontSize={10} textAnchor="middle"
        fill="#9CA3AF" style={{ fontFamily: "sans-serif" }}>
        remote command (engine disable)
      </text>
    </svg>
  );
}

function DiagramDashboard() {
  return (
    <svg width="100%" viewBox="0 0 680 280" className="w-full">
      <ArrowDefs />
      <Node x={40}  y={60} w={180} h={80} title="Google OAuth 2.0" sub="Identity verified" color="blue" />
      <Arrow x1={220} y1={100} x2={276} y2={100} label="pass" />
      <Node x={278} y={60} w={180} h={80} title="IP Whitelisting" sub="Location verified" color="purple" />
      <Arrow x1={458} y1={100} x2={514} y2={100} label="pass" />
      <Node x={516} y={60} w={144} h={80} title="Dashboard" sub="Access granted" color="teal" />
      {/* Fail */}
      <Arrow x1={368} y1={140} x2={368} y2={188} label="fail" />
      <Node x={278} y={190} w={180} h={60} title="Access Denied" color="red" />
      {/* Audit */}
      <Arrow x1={130} y1={140} x2={130} y2={188} />
      <Node x={40}  y={190} w={180} h={60} title="Audit Log" color="gray" />
    </svg>
  );
}

function DiagramAlert() {
  return (
    <svg width="100%" viewBox="0 0 680 300" className="w-full">
      <ArrowDefs />
      <Node x={40}  y={60} w={160} h={80} title="Unauthorized" sub="Movement detected" color="amber" />
      <Arrow x1={200} y1={100} x2={256} y2={100} />
      <Node x={258} y={60} w={164} h={80} title="ESP32 Logic" sub="Threshold triggered" color="purple" />
      {/* Dual output arrows */}
      <line x1={422} y1={90} x2={460} y2={70} stroke="#9CA3AF" strokeWidth={1} markerEnd="url(#ax-arrow)" fill="none" />
      <line x1={422} y1={110} x2={460} y2={150} stroke="#9CA3AF" strokeWidth={1} markerEnd="url(#ax-arrow)" fill="none" />
      <Node x={462} y={42} w={184} h={60} title="SMS / Push Alert" sub="Instant notification" color="coral" />
      <Node x={462} y={132} w={184} h={60} title="Cloud Dashboard" sub="Live alert raised" color="blue" />
      {/* Remote kill */}
      <path
        d="M546 194 L546 244 L422 244"
        fill="none" stroke="#EF4444" strokeWidth={1}
        strokeDasharray="5 3" markerEnd="url(#ax-arrow)"
      />
      <text x={500} y={234} fontSize={10} fill="#EF4444"
        style={{ fontFamily: "sans-serif" }}>
        owner triggers
      </text>
      <Node x={258} y={208} w={164} h={70} title="Engine Disabled" sub="Relay cuts ignition" color="red" />
    </svg>
  );
}

const DIAGRAMS = [DiagramHardware, DiagramDataFlow, DiagramDashboard, DiagramAlert];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SystemArchitecture() {
  const [active, setActive] = useState(0);
  const CurrentDiagram = DIAGRAMS[active];

  return (
    <div
      className="min-h-screen px-4 py-16 relative"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#faf9f7",
      }}
    >
      {/* Background texture — matches LearnMore */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg, #000 0px, #000 1px, transparent 1px, transparent 12px
          )`,
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-gray-400" />
            <p
              className="text-[10px] uppercase tracking-[0.5em] text-gray-400"
              style={{ fontFamily: "sans-serif" }}
            >
              System Architecture
            </p>
          </div>
          <h1
            className="text-6xl md:text-8xl font-normal text-gray-900 leading-[0.95] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            See How It
          </h1>
          <h1
            className="text-6xl md:text-8xl font-normal text-gray-900 leading-[0.95] mb-8 italic"
            style={{ letterSpacing: "-0.03em" }}
          >
            Works.
          </h1>
          <p
            className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed"
            style={{ fontFamily: "sans-serif" }}
          >
            Follow the signal from your vehicle sensors through encrypted cellular
            transmission to real-time dashboard access and remote engine control.
          </p>
        </div>

        {/* ── Tab Navigation — same style as LearnMore ── */}
        <div className="flex flex-wrap gap-3 mb-12">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActive(idx)}
              className="px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition-all duration-300"
              style={{
                fontFamily: "sans-serif",
                background: active === idx ? "#111827" : "#ffffff",
                color: active === idx ? "#ffffff" : "#6b7280",
                border: active === idx ? "1px solid #111827" : "1px solid #e5e7eb",
                boxShadow:
                  active === idx ? "2px 2px 0px #d1d5db" : "2px 2px 0px #e5e7eb",
              }}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* ── Diagram Card ── */}
        <div
          className="bg-white border border-gray-200 p-6 md:p-10 mb-8 transition-all duration-300"
          style={{ boxShadow: "4px 4px 0px #e5e7eb" }}
        >
          {/* Card header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-gray-900" />
            <h3
              className="text-xl font-normal text-gray-900"
              style={{ letterSpacing: "-0.01em" }}
            >
              {active === 0 && "On-Board Hardware Components"}
              {active === 1 && "End-to-End Data Flow"}
              {active === 2 && "Two-Layer Authentication"}
              {active === 3 && "Theft Detection & Remote Control"}
            </h3>
          </div>

          {/* Diagram */}
          <div className="w-full overflow-x-auto">
            <CurrentDiagram />
          </div>

          {/* Step description */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p
              className="text-gray-500 leading-relaxed max-w-3xl"
              style={{ fontFamily: "sans-serif" }}
            >
              {active === 0 &&
                "The ESP32 sits at the heart of the system, connected to a NEO-6M GPS module for location, an accelerometer for motion detection, a relay module to cut the engine, and a SIM800L GSM/4G module for cellular communication — all mounted inside the vehicle."}
              {active === 1 &&
                "Sensor data is collected by the ESP32, encrypted, and transmitted via 4G cellular to the cloud server. The server routes live updates to the dashboard where the owner can view location and issue remote commands, which flow back down the same path to the vehicle."}
              {active === 2 &&
                "Access to the dashboard requires passing two independent layers: first Google OAuth 2.0 verifies identity, then an IP whitelist verifies physical location. Failed attempts are blocked and logged. Both layers must pass before the dashboard loads."}
              {active === 3 &&
                "When the accelerometer detects unauthorized movement the ESP32 immediately fires two parallel paths: an SMS and push alert to the owner, and a live alert on the cloud dashboard. The owner can then issue a remote engine-disable command which travels back to the relay module to cut ignition."}
            </p>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {STEPS[active].cards.map((card, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-900"
              style={{ boxShadow: "3px 3px 0px #e5e7eb" }}
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
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
              </div>
              <div className="p-6">
                <h4
                  className="text-lg font-normal text-gray-900 mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {card.title}
                </h4>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Step Indicators ── */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActive(idx)}
              className="flex items-center gap-2 transition-all duration-300"
              style={{ fontFamily: "sans-serif" }}
            >
              <div
                className="transition-all duration-300"
                style={{
                  width: active === idx ? 24 : 8,
                  height: 2,
                  background: active === idx ? "#111827" : "#D1D5DB",
                }}
              />
              {active === idx && (
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── CTA — matches LearnMore benefits CTA ── */}
        <div
          className="bg-gray-900 border border-gray-900 p-12 text-center"
          style={{ boxShadow: "4px 4px 0px #6b7280" }}
        >
          <h3
            className="text-3xl md:text-4xl font-normal text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to Protect Your Vehicle?
          </h3>
          <p className="text-gray-300 mb-8" style={{ fontFamily: "sans-serif" }}>
            Professional IoT security — GPS, GSM, and smart monitoring working together
          </p>
          <button
            className="bg-white text-gray-900 px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "sans-serif" }}
          >
            Get Started Now
          </button>
        </div>

        {/* ── Footer ── */}
        <div className="mt-16 flex items-center justify-center gap-3">
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