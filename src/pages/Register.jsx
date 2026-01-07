import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { User, Mail, Lock, GraduationCap, Calendar } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    graduationYear: "",
    targetRole: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]
      text-white px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur
        border border-gray-700 rounded-2xl p-8 shadow-xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Start your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400
              bg-clip-text text-transparent">
              free trial
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            14 days free • No credit card required
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10
            border border-red-500/30 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* FULL NAME */}
          <Input
            icon={<User size={16} />}
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            icon={<Mail size={16} />}
            placeholder="Email address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <Input
            icon={<Lock size={16} />}
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* COLLEGE */}
          <Input
            icon={<GraduationCap size={16} />}
            placeholder="College / University"
            name="college"
            value={form.college}
            onChange={handleChange}
          />

          {/* GRAD YEAR */}
          <Input
            icon={<Calendar size={16} />}
            placeholder="Graduation Year (e.g. 2026)"
            name="graduationYear"
            value={form.graduationYear}
            onChange={handleChange}
          />

          {/* TARGET ROLE */}
          <select
            name="targetRole"
            value={form.targetRole}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
              rounded-xl px-4 py-3 text-sm text-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Target Role</option>
            <option>SDE / Software Engineer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Analyst</option>
            <option>Data Scientist</option>
            <option>Product Engineer</option>
          </select>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600
              py-3 rounded-xl font-semibold text-lg
              hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2
        text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full bg-gray-800 border border-gray-700
          rounded-xl pl-10 pr-4 py-3 text-sm text-white
          focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
