import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#111114] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFE3B3] bg-clip-text text-transparent"
        >
          SkillSwap
        </Link>

        {user ? (
          <div className="flex items-center gap-3 md:gap-6">

            <Link
              to="/browse"
              className="text-gray-300 hover:text-white transition"
            >
              Browse
            </Link>

            <Link
              to="/profile"
              className="text-gray-300 hover:text-white transition"
            >
              Profile
            </Link>

            <div className="hidden md:flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FFE3B3]">
              Hi, {user.name}
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-2xl font-medium bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] shadow-[0_8px_30px_rgba(255,103,102,0.25)] hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="px-5 py-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-2xl font-medium bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] shadow-[0_8px_30px_rgba(255,103,102,0.25)] hover:scale-105 transition-all duration-300"
            >
              Register
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;