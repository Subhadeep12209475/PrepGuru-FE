import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import PrepGuruIcon from "../assets/prepguru-icon.png";

/* ================= DAILY MISSION GENERATOR ================= */
function generateDailyMission(user) {
  const missions = [];

  if (user.readiness <= 40) {
    missions.push("Solve 1 easy Array problem");
    missions.push("Solve 1 basic String problem");
  } else if (user.readiness <= 70) {
    missions.push("Solve 2 Array problems");
    missions.push("Solve 1 String problem");
  } else if (user.readiness <= 85) {
    missions.push("Solve 1 Medium DSA problem");
    missions.push("Revise 1 weak topic");
  } else {
    missions.push("Take 1 Mock Interview");
    missions.push("Revise system design basics");
  }

  if (user.streak >= 7) {
    missions.push("🔥 Bonus: Solve 1 extra problem");
  }

  return missions;
}

export default function Landing({ mode = "public" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // mock user data (backend later)
  const user = {
    readiness: 65,
    streak: 6,
    level: "Intermediate"
  };

  const trialDaysLeft = 11;
  const dailyMissions = generateDailyMission(user);

  return (
    <div className="relative min-h-screen text-white overflow-hidden
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]">

      {/* ===== BACKGROUND BLOBS ===== */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
        bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px]
        bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-200px] left-1/3 w-[600px] h-[600px]
        bg-pink-600/10 rounded-full blur-[150px]" />

      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => mode === "public" ? navigate("/") : navigate("/dashboard")}
            >
              <img
                src={PrepGuruIcon}
                alt="PrepGuru"
                className="
                  w-8 h-8 object-contain
                  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]
                  drop-shadow-[0_0_14px_rgba(168,85,247,0.45)]
                  drop-shadow-[0_0_22px_rgba(168,85,247,0.3)]
                "
              />

              <span className="text-2xl font-bold bg-gradient-to-r
                from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PrepGuru
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white">Features</a>
              <a href="#rewards" className="text-gray-300 hover:text-white">Rewards</a>
              {mode === "public" && (
                <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {mode === "public" ? (
                <>
                  <button onClick={() => navigate("/login")} className="text-gray-300 hover:text-white">
                    Sign In
                  </button>
                  <button onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg">
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30
                    text-yellow-400 text-sm">
                    ⏳ Trial: {trialDaysLeft} days
                  </div>

                  <button
                    onClick={() => navigate("/profile")}
                    className="text-gray-300 hover:text-white"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                    className="bg-red-500/20 text-red-400 px-6 py-2 rounded-lg">
                    Logout
                  </button>
                </>
              )}
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 px-4 max-w-7xl mx-auto
        grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2
            rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            🚀 Placement Command Center
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Prepare smarter.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get placed faster.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            PrepPilot guides your daily preparation with clarity,
            consistency, and confidence.
          </p>

          {mode === "public" && (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-500 to-purple-600
                  px-8 py-4 rounded-lg flex items-center">
                Start Free Trial <ArrowRight className="ml-2" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-gray-600 px-8 py-4 rounded-lg">
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="bg-gray-800/70 backdrop-blur p-8 rounded-2xl space-y-4">
          <AnimatedStat title="Study Streak" value="7 Days 🔥" gradient="from-orange-500 to-red-500" />
          <AnimatedStat title="Problems Solved" value="124 ✓" gradient="from-blue-500 to-indigo-500" />
          <AnimatedStat title="Readiness" value={`${user.readiness}%`} gradient="from-purple-500 to-pink-500" />
        </div>
      </section>

      {/* ================= DAILY MISSION (DASHBOARD ONLY) ================= */}
      {mode === "dashboard" && (
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto bg-gray-800/80 border border-gray-700
            rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">

            <div>
              <h3 className="text-xl font-semibold mb-1">🎯 Today’s Mission</h3>
              <p className="text-gray-400 text-sm">
                Auto-generated based on your readiness
              </p>

              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                {dailyMissions.map((m, i) => (
                  <li key={i}>✔ {m}</li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <div className="text-lg font-bold text-green-400 mb-3">
                +5% Readiness Boost 🚀
              </div>

              <button className="bg-green-500/20 text-green-400
                px-6 py-3 rounded-lg font-semibold hover:bg-green-500/30 transition">
                Mark as Completed
              </button>

              <p className="text-xs text-gray-500 mt-2">
                Pro+ feature
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-gray-800/50 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          <FeatureCard
  title="Smart Practice"
  desc="Only placement-relevant problems"
  onClick={() => navigate("/practice")}
/>

          <FeatureCard title="Progress Analytics" desc="Track readiness & growth" pro />
          <FeatureCard title="Resume Feedback" desc="ATS score & suggestions" pro />
          <FeatureCard title="Daily Missions" desc="Personalized coaching" pro />
        </div>
      </section>

      {/* ================= REWARDS ================= */}
      <section id="rewards" className="py-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Learn. Improve. Get rewarded.
        </h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-6 text-center">
          <Reward title="🔥 Streaks" desc="Consistency rewards" />
          <Reward title="🏅 Badges" desc="Skill milestones" />
          <Reward title="🎯 Levels" desc="Preparation maturity" />
          <Reward title="🚀 Boosts" desc="Readiness increase" />
          <Reward title="💼 Status" desc="Placement-ready tag" />
        </div>
      </section>

      {/* ================= PRICING (LANDING ONLY) ================= */}
      {mode === "public" && (
        <section id="pricing" className="py-24 px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Choose your plan</h2>
          <p className="text-gray-400 mb-12">
            Upgrade only when you’re serious.
          </p>

          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
            <PricingCard title="Free" price="₹0" />
            <PricingCard title="Pro" price="₹299" highlight />
            <PricingCard title="Pro Plus" price="₹499" />
            <PricingCard title="Ultimate" price="₹999" />
          </div>
        </section>
      )}

      <footer className="border-t border-gray-800 py-8 text-center text-gray-400">
        © 2025 PrepPilot. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function AnimatedStat({ title, value, gradient }) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-r ${gradient}
      transform transition-all duration-300 hover:scale-[1.05]`}>
      <div className="absolute inset-0 opacity-30 blur-xl bg-white/20" />
      <div className="relative">
        <p className="text-sm opacity-90 mb-1">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, pro, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-gray-800 p-6 rounded-xl border border-gray-700
      transition cursor-pointer
      hover:-translate-y-2 hover:border-blue-500/50 hover:bg-gray-800/80`}
    >

      {pro && (
        <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full
          bg-purple-500/20 text-purple-400">
          🔒 PRO
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function Reward({ title, desc }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, highlight }) {
  return (
    <div className={`p-6 rounded-2xl border
      ${highlight ? "border-purple-500 bg-purple-500/10 scale-105" : "border-gray-700 bg-gray-800"}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-4">{price}</div>
      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
        Start
      </button>
    </div>
  );
}
