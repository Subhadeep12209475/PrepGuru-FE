import { getRoadmap } from "../utils/roadmap";

export default function Roadmap({ role }) {
  const roadmap = getRoadmap(role || "Software Developer");

  return (
    <div className="page">
      <h2>Your Personalized Roadmap 🎯</h2>

      <div className="grid">
        {roadmap.map((item, index) => (
          <div className="card" key={index}>
            {index + 1}. {item}
          </div>
        ))}
      </div>
    </div>
  );
}
