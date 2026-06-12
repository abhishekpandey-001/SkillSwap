import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      login(data.user, data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1D] p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-[#CA2851]/20 blur-[140px]" />

      <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#FFB173]/20 blur-[140px]" />

      {/* Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_10px_40px_rgba(255,103,102,0.12)] border border-white/10 relative z-10">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold leading-normal pb-1 bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFE3B3] bg-clip-text text-transparent">
            Welcome back
          </h2>

          <p className="text-gray-400 mt-2">
            Enter your details to access your account.
          </p>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:border-[#FF6766] focus:ring-2 focus:ring-[#FF6766]/20 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:border-[#FF6766] focus:ring-2 focus:ring-[#FF6766]/20 transition-all"
              />
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full mt-2 rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] shadow-[0_10px_40px_rgba(255,103,102,0.25)] hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            Login
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#FFE3B3] hover:text-white font-medium transition-colors duration-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;