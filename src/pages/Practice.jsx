import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AppNavbar from "../components/AppNavbar";

export default function Practice() {
  const [problems, setProblems] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get("/problems");
        setProblems(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  /* ---------------- TOPIC COUNTS ---------------- */
  const topicCounts = problems.reduce((acc, p) => {
    acc[p.topic] = (acc[p.topic] || 0) + 1;
    return acc;
  }, {});
  const topics = ["All", ...Object.keys(topicCounts)];

  /* ---------------- FILTER ---------------- */
  const filteredProblems = problems.filter(p => {
    const matchTopic =
      selectedTopic === "All" || p.topic === selectedTopic;
    const matchSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <>
      {/* ✅ GLOBAL NAVBAR */}
      <AppNavbar trialDaysLeft={11} />

      {/* ✅ PAGE WRAPPER */}
      <div className="pt-20 min-h-screen text-white
        bg-gradient-to-br from-[#0b1220] via-[#020617] to-[#020617]
        px-6 pb-12">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6">

            {/* HEADER */}
            <div>
              <h1 className="text-3xl font-bold">Practice Problems</h1>
              <p className="text-gray-400 text-sm">
                {filteredProblems.length} / {problems.length} questions
              </p>
            </div>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search problems by title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900/70 border border-gray-700 rounded-xl
                px-4 py-3 text-sm focus:outline-none
                focus:ring-2 focus:ring-purple-500"
            />

            {/* TOPIC FILTERS */}
            <div className="flex flex-wrap gap-3">
              {topics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-full text-sm border transition
                    ${
                      selectedTopic === topic
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                >
                  {topic}
                  {topic !== "All" && (
                    <span className="ml-2 text-xs opacity-70">
                      {topicCounts[topic]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* TABLE CARD */}
            <div className="bg-gray-900/70 border border-gray-700 rounded-xl overflow-hidden">

              {/* TABLE HEADER */}
              <div className="grid grid-cols-[70px_1fr_130px_120px]
                px-4 py-3 text-sm text-gray-400
                border-b border-gray-700 bg-gray-900/80">
                <span>Status</span>
                <span>Title</span>
                <span>Difficulty</span>
                <span>Action</span>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="p-6 text-gray-400">
                  Loading problems...
                </div>
              )}

              {/* ROWS */}
              {!loading &&
                filteredProblems.map(problem => (
                  <div
                    key={problem._id}
                    className="grid grid-cols-[70px_1fr_130px_120px]
                      px-4 py-4 items-center
                      border-b border-gray-700
                      hover:bg-gray-800/60 transition"
                  >
                    <span
                      className={`text-lg ${
                        problem.solved
                          ? "text-green-400"
                          : "text-gray-500"
                      }`}
                    >
                      {problem.solved ? "✔" : "•"}
                    </span>

                    <span
                      className="cursor-pointer hover:text-blue-400"
                      onClick={() =>
                        navigate(`/practice/${problem.id}`)
                      }
                    >
                      {problem.title}
                    </span>

                    <span
                      className={`px-3 py-1 text-xs rounded-full w-fit
                        ${
                          problem.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400"
                            : problem.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {problem.difficulty}
                    </span>

                    <button
                      onClick={() =>
                        navigate(`/practice/${problem.id}`)
                      }
                      className="bg-blue-600/20 text-blue-400
                        px-4 py-2 rounded-lg text-sm
                        hover:bg-blue-600/30 transition"
                    >
                      Solve →
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="sticky top-24">
            <CalendarWidget
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= CALENDAR ================= */

function CalendarWidget({ currentMonth, setCurrentMonth }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long"
  });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="bg-gray-900/80 border border-gray-700
      rounded-xl p-4 w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
          className="text-gray-400 hover:text-white"
        >
          ‹
        </button>

        <h3 className="font-semibold">
          {monthName} {year}
        </h3>

        <button
          onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
          className="text-gray-400 hover:text-white"
        >
          ›
        </button>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day, i) =>
          day ? (
            <div
              key={i}
              className="py-2 rounded-lg
                bg-gray-800 text-gray-200
                hover:bg-purple-500/20 transition"
            >
              {day}
            </div>
          ) : (
            <div key={i} />
          )
        )}
      </div>

      {/* LEGEND */}
      <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          Solved
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full" />
          Pending
        </span>
      </div>
    </div>
  );
}
