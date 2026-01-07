import { useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import PrepGuruIcon from "../assets/prepguru-icon.png"; // ✅ adjust path if needed

export default function AppNavbar({ trialDaysLeft = 11 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `relative px-1 flex items-center gap-1 transition ${
      isActive(path)
        ? "text-white font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav
      className="
        fixed top-0 w-full z-50
        bg-[#0B1220]/80 backdrop-blur-xl
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ================= LEFT – LOGO ================= */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          {/* ICON WITH PURPLE GLOW */}
          <img
            src={PrepGuruIcon}
            alt="PrepGuru"
            className="
              w-9 h-9 object-contain
              drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]
              drop-shadow-[0_0_14px_rgba(168,85,247,0.45)]
              drop-shadow-[0_0_22px_rgba(168,85,247,0.3)]
            "
          />

          {/* BRAND NAME */}
          <span className="
            text-xl font-bold
            bg-gradient-to-r from-blue-400 to-purple-400
            bg-clip-text text-transparent
          ">
            PrepGuru
          </span>
        </div>

        {/* ================= CENTER – NAV LINKS ================= */}
        <div className="hidden md:flex items-center gap-10 text-sm">

          <button
            onClick={() => navigate("/dashboard")}
            className={linkClass("/dashboard")}
          >
            <LayoutDashboard size={16} />
            Dashboard
            {isActive("/dashboard") && <ActiveUnderline />}
          </button>

          <button
            onClick={() => navigate("/practice")}
            className={linkClass("/practice")}
          >
            Practice
            {isActive("/practice") && <ActiveUnderline />}
          </button>

          <button
            onClick={() => navigate("/progress")}
            className={linkClass("/progress")}
          >
            Progress
            {isActive("/progress") && <ActiveUnderline />}
          </button>

          <button
            onClick={() => navigate("/resume")}
            className={linkClass("/resume")}
          >
            Resume
            {isActive("/resume") && <ActiveUnderline />}
          </button>
        </div>

        {/* ================= RIGHT – ACTIONS ================= */}
        <div className="flex items-center gap-4">

          {/* TRIAL BADGE */}
          <div className="
            hidden sm:flex items-center gap-2
            px-4 py-1.5 rounded-full
            bg-yellow-500/10 border border-yellow-500/30
            text-yellow-400 text-xs
          ">
            ⏳ Trial: {trialDaysLeft} days
          </div>

          {/* PROFILE */}
          <button
            onClick={() => navigate("/profile")}
            className={`${linkClass("/profile")} flex items-center`}
          >
            <User size={18} />
            {isActive("/profile") && <ActiveUnderline />}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="
              flex items-center gap-1
              bg-red-500/15 text-red-400
              px-3 py-2 rounded-lg
              hover:bg-red-500/25 transition
            "
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ================= ACTIVE UNDERLINE ================= */

function ActiveUnderline() {
  return (
    <span
      className="
        absolute left-0 -bottom-2 w-full h-[2px]
        bg-gradient-to-r from-blue-500 to-purple-600
        rounded-full
      "
    />
  );
}
