export default function Progress() {
  return (
    <div className="progress-page">
      <h1>📊 Progress Overview</h1>

      <div className="bar-grid">
        {[60, 80, 45, 90, 70].map((h, i) => (
          <div key={i} className="bar">
            <div style={{ height: `${h}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
