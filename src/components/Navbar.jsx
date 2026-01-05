import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">PlaceMentor</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/planner">Planner</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li>
          <Link to="/login" className="login-btn">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
