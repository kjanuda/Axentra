"use client";

import { useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
  photo: string;
  token?: string;
};

type Recommendation = {
  text: string;
  authorName: string;
  authorTitle: string;
  authorPhoto?: string;
  userEmail?: string;
};

export default function WriteRecommendation() {
  const [text, setText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorTitle, setAuthorTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  const BACKEND_URL = "http://localhost:4000";

  // ─── Fetch recommendations ───────────────────────────────────────────────────
  const fetchRecommendations = async () => {
    setLoadingRecs(true);
    try {
      const res = await fetch(`${BACKEND_URL}/users/recommendation/all`);
      const data = await res.json();
      const list: Recommendation[] = Array.isArray(data)
        ? data
        : data.recommendations ?? [];
      setRecommendations(list);
    } catch {
      console.error("Failed to fetch recommendations");
      setRecommendations([]);
    } finally {
      setLoadingRecs(false);
    }
  };

  // ─── On mount: handle OAuth return + localStorage ────────────────────────────
  useEffect(() => {
    fetchRecommendations();

    const params    = new URLSearchParams(window.location.search);
    const email     = params.get("email");
    const name      = params.get("name");
    const photo     = params.get("photo");
    const token     = params.get("token");
    const openModal = params.get("openModal");

    if (email) {
      const userData: User = {
        name:  name || email.split("@")[0],
        email: email,
        photo: photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=random`,
        ...(token ? { token } : {}),
      };

      setUser(userData);
      setAuthorName(userData.name);
      localStorage.setItem("user", JSON.stringify(userData));

      window.history.replaceState({}, document.title, window.location.pathname);

      if (openModal === "true") {
        setShowModal(true);
      }
      return;
    }

    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
        setAuthorName(parsed.name || parsed.email.split("@")[0]);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ─── Google login ────────────────────────────────────────────────────────────
  const handleLogin = () => {
    const state = btoa(JSON.stringify({
      role:     "recommender",
      redirect: "/write-recommendation",
    }));
    window.location.href = `${BACKEND_URL}/auth/google?state=${encodeURIComponent(state)}`;
  };

  // ─── Open modal or trigger login ─────────────────────────────────────────────
  const handleOpenModal = () => {
    if (user) {
      setShowModal(true);
    } else {
      handleLogin();
    }
  };

  // ─── Submit recommendation ───────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!text.trim() || !authorTitle.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await fetch(`${BACKEND_URL}/users/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail:   user?.email,
          authorPhoto: user?.photo,
          text,
          authorName,
          authorTitle,
        }),
      });
      alert("Recommendation submitted ✅");
      setText("");
      setAuthorTitle("");
      setShowModal(false);
      fetchRecommendations();
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  // ─── Build marquee array: repeat enough times so loop is seamless ─────────────
  const getMarqueeItems = () => {
    if (recommendations.length === 0) return [];
    const repeatCount = recommendations.length < 4
      ? Math.ceil(8 / recommendations.length)
      : 2;
    return Array.from({ length: repeatCount * 2 }, () => recommendations).flat();
  };

  return (
    <div
      className="min-h-screen bg-white px-4 py-16"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-4xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-3">
            Professional Testimonials
          </p>
          <h1
            className="text-5xl md:text-6xl font-normal text-gray-900 mb-1 leading-[1.05]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Recommendations
          </h1>
          <h1
            className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 leading-[1.05] italic"
            style={{ letterSpacing: "-0.02em" }}
          >
            & Testimonials.
          </h1>

          <button
            onClick={handleOpenModal}
            className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 text-sm
              uppercase tracking-[0.2em] hover:bg-black transition-all duration-300 active:scale-95 mt-6"
            style={{ fontFamily: "sans-serif" }}
          >
            Share Your Recommendation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* ── Recommendations Marquee ─────────────────────────────────────── */}
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 28s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        {loadingRecs ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm uppercase tracking-[0.3em]" style={{ fontFamily: "sans-serif" }}>
              No recommendations yet
            </p>
            <p className="text-gray-300 text-xs mt-2" style={{ fontFamily: "sans-serif" }}>
              Be the first to share your experience
            </p>
          </div>
        ) : (
          <div
            className="mb-16 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="marquee-track gap-5">
              {getMarqueeItems().map((rec, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-8 hover:border-gray-900 transition-all duration-300 group flex-shrink-0"
                  style={{ width: "360px" }}
                >
                  <svg className="w-8 h-8 text-gray-300 mb-4 group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-4">"{rec.text}"</p>
                  <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                    {rec.authorPhoto ? (
                      <img
                        src={rec.authorPhoto}
                        alt={rec.authorName}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(rec.authorName)}&background=e5e7eb&color=374151&size=40`;
                        }}
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-semibold"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {rec.authorName?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{rec.authorName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{rec.authorTitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gray-200" />
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300" style={{ fontFamily: "sans-serif" }}>
            Axentra · Professional Network
          </p>
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-3">Testimonial Submission</p>
              <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-1 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>Write a</h2>
              <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-8 leading-[1.05] italic" style={{ letterSpacing: "-0.02em" }}>Recommendation.</h2>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* ── User profile strip ── */}
              {user && (
                <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 border border-gray-200">
                  <img
                    src={user.photo}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=e5e7eb&color=374151&size=48`;
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                      setAuthorName("");
                    }}
                    className="ml-auto text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Sign out
                  </button>
                </div>
              )}

              {/* ── Form (logged in) ── */}
              {user ? (
                <>
                  <div className="mb-6">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Your Message</label>
                    <textarea
                      placeholder="Share your experience working with this person..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={6}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base px-5 py-4 resize-none outline-none
                        focus:border-gray-900 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                      style={{ fontFamily: "inherit" }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Your Name</label>
                      <input
                        value={authorName}
                        readOnly
                        className="w-full bg-gray-100 border border-gray-200 text-gray-500 text-base px-5 py-3 outline-none cursor-not-allowed"
                        style={{ fontFamily: "inherit" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">University / Company</label>
                      <input
                        placeholder="e.g. MIT · Product Lead"
                        value={authorTitle}
                        onChange={(e) => setAuthorTitle(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base px-5 py-3 outline-none
                          focus:border-gray-900 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                        style={{ fontFamily: "inherit" }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-gray-300" style={{ fontFamily: "sans-serif" }}>
                      Your recommendation will be reviewed before publishing.
                    </p>
                    <button
                      onClick={handleSubmit}
                      className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 text-sm
                        uppercase tracking-[0.2em] hover:bg-black transition-all duration-300 active:scale-95 whitespace-nowrap"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Submit
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                /* ── Google sign-in prompt ── */
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-gray-600 text-base mb-2">Please sign in to continue</p>
                  <p className="text-gray-400 text-sm mb-6">Sign in with Google to submit your recommendation</p>
                  <button
                    onClick={handleLogin}
                    className="group inline-flex items-center gap-3 bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 text-sm
                      uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}