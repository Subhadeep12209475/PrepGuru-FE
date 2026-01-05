import { useState } from "react";

const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Array",
    difficulty: "Easy",
    solved: true
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    topic: "String",
    difficulty: "Medium",
    solved: false
  },
  {
    id: 3,
    title: "Merge Intervals",
    topic: "Greedy",
    difficulty: "Medium",
    solved: false
  },
  {
    id: 4,
    title: "Binary Tree Maximum Path Sum",
    topic: "Tree",
    difficulty: "Hard",
    solved: false
  }
];

export default function Practice() {
  const [filter, setFilter] = useState("All");

  const filteredProblems =
    filter === "All"
      ? problemsData
      : problemsData.filter(p => p.difficulty === filter);

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>🧠 Practice Problems</h1>
        <p>LeetCode-style daily DSA practice</p>
      </div>

      {/* FILTERS */}
      <div className="problem-filters">
        {["All", "Easy", "Medium", "Hard"].map(level => (
          <button
            key={level}
            className={`filter ${filter === level ? "active" : ""} ${level.toLowerCase()}`}
            onClick={() => setFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="problem-table">
        <div className="problem-header">
          <span>Status</span>
          <span>Title</span>
          <span>Topic</span>
          <span>Difficulty</span>
          <span>Action</span>
        </div>

        {filteredProblems.map(problem => (
          <div className="problem-row" key={problem.id}>
            <span>{problem.solved ? "✅" : "⬜"}</span>
            <span className="problem-title">{problem.title}</span>
            <span className="topic">{problem.topic}</span>
            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
            <button className="solve-btn">
              {problem.solved ? "Solved" : "Solve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
