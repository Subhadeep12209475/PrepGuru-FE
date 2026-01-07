import AppNavbar from "../components/AppNavbar";
import {
  Award,
  Star,
  Flame,
  Eye,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function Profile() {
  const user = {
    name: "Subhadeep Mukherjee",
    username: "@subhadeep_2002",
    bio: "Improving Daily 🚀 Java Development Enthusiast",
    goal: "400+ Problems in 2025",
    college: "LPU",
    skills: ["Java", "C++"],
    rank: "635,213",
    rating: 1441,
    globalRank: "536,543 / 809,188",
    attended: 3,
    topPercent: "66.72%",
    solved: 220,
    total: 3802,
    easy: [92, 921],
    medium: [108, 1982],
    hard: [20, 899],
    badges: [
      { name: "100 Days Badge 2025", unlocked: true },
      { name: "Consistency Star", unlocked: true },
      { name: "DP Master", unlocked: false },
      { name: "Placement Ready", unlocked: false },
    ],
    community: {
      views: 3,
      solutions: 4,
      discuss: 0,
      reputation: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">
      <AppNavbar trialDaysLeft={11} />

      <div className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

        {/* ================= LEFT PROFILE CARD ================= */}
        <div className="bg-[#0E1628] border border-white/5 rounded-xl p-6 space-y-6">

          {/* AVATAR */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600
              flex items-center justify-center text-2xl font-bold">
              SM
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-400">{user.username}</p>
            </div>
          </div>

          {/* BIO */}
          <p className="text-sm text-gray-300">{user.bio}</p>
          <p className="text-sm text-green-400">
            🎯 Goal: {user.goal}
          </p>

          {/* EDIT */}
          <button className="w-full bg-green-600/20 text-green-400
            py-2 rounded-lg hover:bg-green-600/30 transition">
            Edit Profile
          </button>

          <Divider />

          {/* DETAILS */}
          <Info label="College" value={user.college} />
          <Info label="Skills" value={user.skills.join(", ")} />
          <Info label="Rank" value={user.rank} />

          <Divider />

          {/* COMMUNITY */}
          <h3 className="font-semibold mb-2">Community Stats</h3>
          <Stat icon={<Eye size={16} />} label="Views" value={user.community.views} />
          <Stat icon={<CheckCircle size={16} />} label="Solutions" value={user.community.solutions} />
          <Stat icon={<MessageCircle size={16} />} label="Discuss" value={user.community.discuss} />
          <Stat icon={<Star size={16} />} label="Reputation" value={user.community.reputation} />
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="space-y-6">

          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TopStat label="Contest Rating" value={user.rating} />
            <TopStat label="Global Rank" value={user.globalRank} />
            <TopStat label="Attended" value={user.attended} />
            <TopStat label="Top %" value={user.topPercent} />
          </div>

          {/* SOLVED */}
          <div className="bg-[#0E1628] border border-white/5 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Problems Solved</h3>
              <p className="text-4xl font-bold">
                {user.solved}
                <span className="text-sm text-gray-400"> / {user.total}</span>
              </p>
              <p className="text-sm text-green-400 mt-2">
                Easy: {user.easy[0]} / {user.easy[1]}
              </p>
              <p className="text-sm text-yellow-400">
                Medium: {user.medium[0]} / {user.medium[1]}
              </p>
              <p className="text-sm text-red-400">
                Hard: {user.hard[0]} / {user.hard[1]}
              </p>
            </div>

            {/* BADGES */}
            <div>
              <h3 className="font-semibold mb-3">Badges</h3>
              {user.badges.map((b, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 mb-2 text-sm
                    ${b.unlocked ? "text-yellow-400" : "text-gray-500"}`}
                >
                  <Award size={16} />
                  {b.name}
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY (MOCK) */}
          <div className="bg-[#0E1628] border border-white/5 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Activity (Mock)</h3>
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-5 rounded
                    ${i % 3 === 0 ? "bg-green-500" : "bg-gray-700"}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Divider() {
  return <div className="h-px bg-white/5" />;
}

function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-300">
      <span className="text-gray-500">{label}: </span>{value}
    </p>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300">
      {icon}
      {label}: {value}
    </div>
  );
}

function TopStat({ label, value }) {
  return (
    <div className="bg-[#0E1628] border border-white/5 rounded-xl p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}
