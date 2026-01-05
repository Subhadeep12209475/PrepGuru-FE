import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Solve 2 DSA problems", done: false },
    { id: 2, text: "Revise DBMS normalization", done: false },
    { id: 3, text: "Improve resume projects", done: false }
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const allDone = tasks.every(t => t.done);

  return (
    <div className="dashboard-colorful">

      {/* ================= APP BANNER ================= */}
      <div className="app-banner">
        <div className="app-banner-overlay">
          <div className="app-banner-content">
            <h1 className="app-name">PrepPilot</h1>

            <p className="app-tagline">
              Your personal command center for placements
            </p>

            <blockquote className="app-quote">
              “Small daily progress builds unstoppable momentum.”
            </blockquote>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <section className="stats-row">
        <div className="stat-box streak">
          <span>Study Streak</span>
          <h2>7 Days</h2>
        </div>

        <div className="stat-box solved">
          <span>Problems Solved</span>
          <h2>124</h2>
        </div>

        <div className="stat-box ready">
          <span>Readiness</span>
          <h2>65%</h2>
        </div>
      </section>

      {/* ================= MAIN ACTIONS ================= */}
      <section className="dashboard-actions">

        <Link to="/practice" className="action-card gradient-practice">
          <h3>Practice</h3>
          <p>LeetCode-style DSA problems with difficulty filters</p>
        </Link>

        <Link to="/progress" className="action-card gradient-progress">
          <h3>Progress</h3>
          <p>Weekly & monthly preparation analytics</p>
        </Link>

        <Link to="/resume" className="action-card gradient-resume">
          <h3>Resume</h3>
          <p>ATS score, feedback & improvement tips</p>
        </Link>

        <Link to="/planner" className="action-card gradient-planner">
          <h3>Planner</h3>
          <p>Daily goals, tasks & focus tracking</p>
        </Link>

      </section>

      {/* ================= TODAY'S FOCUS ================= */}
      <section className="today-focus-card">
        <div className="today-focus-header">
          <h2>Today’s Focus</h2>
          <span className="focus-date">Stay consistent</span>
        </div>

        <div className="task-list">
          {tasks.map(task => (
            <label
              key={task.id}
              className={`task-item ${task.done ? "done" : ""}`}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className="checkmark"></span>
              <span className="task-text">{task.text}</span>
            </label>
          ))}
        </div>

        {allDone && (
          <div className="reward-box">
            🎉 Excellent work!
            <span>You completed all today’s goals.</span>
          </div>
        )}
      </section>

    </div>
  );
}
