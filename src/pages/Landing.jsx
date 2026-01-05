import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="hero-unique">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Discipline <span>Beats Luck</span> <br />
          Every Single Time
        </h1>

        <p className="hero-desc">
          Placements are not cracked overnight. They are earned through
          daily discipline, smart planning, and focused execution.
        </p>

        <p className="hero-quote">
          “Your future company is watching your consistency today.”
        </p>

        <div className="hero-buttons">
  <Link to="/register" className="btn btn-primary">
    Start Free Preparation
  </Link>

  <Link to="/login" className="btn btn-login">
  Login
</Link>

</div>

      </div>
    </div>
  );
}
