import { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import {
  UploadCloud,
  CheckCircle,
  Wand2,
  Briefcase,
  Copy
} from "lucide-react";

export default function Resume() {
  /* ================= STATE ================= */
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [atsScore, setAtsScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Upload your resume to begin");

  const [jdResult, setJdResult] = useState(null);

  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  /* ================= ATS ANALYSIS ================= */
  const analyzeResume = async (file) => {
    setLoading(true);
    setStatus("Analyzing resume with ATS engine...");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:5000/api/ats/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setAtsScore(data.atsScore ?? 0);
      setResumeText(data.text ?? "");
      setStatus("ATS analysis completed ✅");
    } catch {
      setStatus("ATS analysis failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILE UPLOAD ================= */
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF resumes are supported");
      return;
    }
    setResumeFile(file);
    analyzeResume(file);
  };

  /* ================= JD MATCH ================= */
  const runJDMatch = async () => {
    if (!resumeText || !jobDescription) {
      alert("Resume & Job Description required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ats/jd-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription
        })
      });

      const data = await res.json();
      setJdResult(data);
    } finally {
      setLoading(false);
    }
  };

  /* ================= AI REWRITE ================= */
  const rewriteWithAI = async () => {
    if (!aiInput || !jobDescription) {
      alert("Provide resume content & job description");
      return;
    }

    setAiLoading(true);
    setAiOutput("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionText: aiInput,
          jobDescription
        })
      });

      const data = await res.json();
      setAiOutput(data.rewritten || "No output generated");
    } catch {
      setAiOutput("❌ AI rewrite failed. Try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-[#0B1220] text-white min-h-screen">
      <AppNavbar />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            ATS Resume Checker
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              with JD + AI Power
            </span>
          </h1>

          <p className="text-gray-400 mb-8">
            Upload your resume, match it against a job description,
            and rewrite it using AI to clear ATS filters.
          </p>

          <label className="inline-flex items-center gap-3 px-8 py-4
            bg-gradient-to-r from-blue-500 to-purple-600
            rounded-xl cursor-pointer font-semibold">
            <UploadCloud />
            Upload Resume
            <input type="file" accept=".pdf" onChange={handleUpload} hidden />
          </label>

          <p className="mt-4 text-sm text-yellow-400">{status}</p>
        </div>

        {/* ATS SCORE */}
        <div className="flex justify-center">
          <div className="w-52 h-52 rounded-full border-4 border-purple-500/60
            flex flex-col items-center justify-center">
            <span className="text-5xl font-bold">
              {loading ? "…" : `${atsScore}%`}
            </span>
            <span className="text-sm text-gray-400 mt-2">
              ATS Score
            </span>
          </div>
        </div>
      </section>

      {/* ================= JD MATCH ================= */}
      <section className="py-20 bg-black/60">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Briefcase /> Job Description Match
          </h2>

          <textarea
            rows={6}
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#0E1628] border border-white/10
              text-sm mb-4"
          />

          <button
            onClick={runJDMatch}
            disabled={loading}
            className="bg-purple-600 px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Compare Resume vs JD"}
          </button>

          {jdResult && (
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <StatCard title="Match Score" value={`${jdResult.matchScore}%`} />
              <ListCard title="Matched Skills" items={jdResult.matchedSkills} color="green" />
              <ListCard title="Missing Skills" items={jdResult.missingSkills} color="red" />
            </div>
          )}
        </div>
      </section>

      {/* ================= AI REWRITE ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Wand2 /> AI Resume Rewrite
        </h2>

        <textarea
          rows={6}
          placeholder="Paste resume summary / experience bullets here..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#0E1628] border border-white/10
            text-sm mb-4"
        />

        <button
          onClick={rewriteWithAI}
          disabled={aiLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600
            px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {aiLoading ? "Rewriting..." : "Rewrite with AI"}
        </button>

        {aiOutput && (
          <div className="mt-6 bg-[#0E1628] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle className="text-green-400" />
                AI Optimized Output
              </h3>

              <button
                onClick={() => navigator.clipboard.writeText(aiOutput)}
                className="text-sm text-blue-400 hover:underline flex items-center gap-1"
              >
                <Copy size={16} /> Copy
              </button>
            </div>

            <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              {aiOutput}
            </pre>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        © 2026 PrepGuru · ATS Resume Platform
      </footer>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-[#0E1628] border border-white/10 rounded-xl p-6 text-center">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-green-400">{value}</p>
    </div>
  );
}

function ListCard({ title, items = [], color }) {
  const colorMap = {
    green: "text-green-400",
    red: "text-red-400",
    yellow: "text-yellow-400"
  };

  return (
    <div className="bg-[#0E1628] border border-white/10 rounded-xl p-6">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className={`text-sm ${colorMap[color]}`}>
        {items.length ? items.join(", ") : "—"}
      </p>
    </div>
  );
}
