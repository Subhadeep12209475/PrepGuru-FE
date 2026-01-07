import AppNavbar from "../components/AppNavbar";
import {
  TrendingUp,
  Target,
  FileText,
  Briefcase,
  Trophy
} from "lucide-react";

export default function Progress() {
  // TEMP STATIC DATA (until backend ready)
  const progress = {
    atsScore: 72,
    resumes: 3,
    jdChecks: 2,
    readiness: "Intermediate",
    strongSkills: ["JavaScript", "React", "Node.js"],
    weakSkills: ["System Design", "AWS"],
    milestones: [
      {
        title: "First Resume Upload",
        description: "Uploaded and analyzed resume",
        completed: true
      },
      {
        title: "ATS Score 70+",
        description: "Crossed 70% ATS score",
        completed: true
      },
      {
        title: "5 JD Matches",
        description: "Compare resume with 5 JDs",
        completed: false
      }
    ]
  };

  return (
    <div className="bg-[#0B1220] min-h-screen text-white">
      <AppNavbar />

      {/* HEADER */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-400">
          Track ATS score, JD matches & placement readiness
        </p>
      </section>

      {/* STATS */}
      <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-4 gap-6 mb-20">
        <Stat icon={<TrendingUp />} title="ATS Score" value={`${progress.atsScore}%`} />
        <Stat icon={<FileText />} title="Resumes" value={progress.resumes} />
        <Stat icon={<Briefcase />} title="JD Matches" value={progress.jdChecks} />
        <Stat icon={<Target />} title="Readiness" value={progress.readiness} />
      </section>

      {/* SKILLS */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl font-bold mb-6">Skill Readiness</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <SkillCard title="Strong Skills" items={progress.strongSkills} color="green" />
          <SkillCard title="Skills to Improve" items={progress.weakSkills} color="red" />
        </div>
      </section>

      {/* MILESTONES */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy /> Milestones
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {progress.milestones.map((m, i) => (
            <div
              key={i}
              className="bg-[#0E1628] border border-white/10 rounded-xl p-6"
            >
              <h4 className="font-semibold mb-1">{m.title}</h4>
              <p className="text-sm text-gray-400 mb-2">{m.description}</p>
              <span className={`text-xs ${m.completed ? "text-green-400" : "text-yellow-400"}`}>
                {m.completed ? "Completed ✓" : "In Progress"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        © 2026 PrepGuru · Progress Tracker
      </footer>
    </div>
  );
}

/* COMPONENTS */

function Stat({ icon, title, value }) {
  return (
    <div className="bg-[#0E1628] border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <p className="text-sm text-gray-400">{title}</p>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function SkillCard({ title, items, color }) {
  return (
    <div className="bg-[#0E1628] border border-white/10 rounded-xl p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className={`text-sm space-y-1 ${color === "green" ? "text-green-400" : "text-red-400"}`}>
        {items.map((s, i) => (
          <li key={i}>• {s}</li>
        ))}
      </ul>
    </div>
  );
}
