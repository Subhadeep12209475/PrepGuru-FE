import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// NEW FEATURE PAGES
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import ResumeChecker from "./pages/ResumeChecker";

// OPTIONAL / FUTURE
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* FEATURE PAGES */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/resume" element={<ResumeChecker />} />

        {/* OPTIONAL */}
        <Route path="/planner" element={<Planner />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}
