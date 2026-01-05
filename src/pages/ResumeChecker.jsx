export default function Resume() {
  return (
    <div className="resume-page">
      <h1>📄 Resume Checker</h1>

      <div className="dashboard-card">
        <input type="file" />
        <button className="btn primary">Analyze Resume</button>

        <h2 style={{ marginTop: "20px", color: "#38bdf8" }}>
          Score: 72 / 100
        </h2>
        <p>Good – Improve projects & skills section</p>
      </div>
    </div>
  );
}
