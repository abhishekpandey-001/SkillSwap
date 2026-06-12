import { useState } from "react";
import API from "../api/axios";

const SkillCard = ({ userData }) => {
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState("");

  const handleRequest = async () => {
    try {
      await API.post("/requests", { to: userData._id });
      setRequested(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_40px_rgba(255,103,102,0.12)] hover:border-[#FF6766]/40 hover:-translate-y-1 transition-all duration-300">

      {/* User Name */}
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFE3B3] bg-clip-text text-transparent">
        {userData.name}
      </h3>

      {/* Skills Offered */}
      <div className="mb-6">
        <p className="text-[#FFB173] font-semibold mb-3">
          Skills Offered
        </p>

        <div className="flex flex-wrap gap-3">
          {userData.skillsOffered.map((skill, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-full bg-white/5 border border-[#FF6766]/30 backdrop-blur-lg text-sm hover:border-[#FF6766] transition-all"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mb-8">
        <p className="text-[#FFE3B3] font-semibold mb-3">
          Skills Wanted
        </p>

        <div className="flex flex-wrap gap-3">
          {userData.skillsWanted.map((skill, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-full bg-white/5 border border-[#FFB173]/30 backdrop-blur-lg text-sm hover:border-[#FFB173] transition-all"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleRequest}
        disabled={requested}
        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
          requested
            ? "bg-green-500/20 text-green-300 border border-green-400/30 cursor-not-allowed"
            : "bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] hover:scale-[1.02] shadow-[0_10px_40px_rgba(255,103,102,0.25)]"
        }`}
      >
        {requested ? "✓ Request Sent" : "Request Swap"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-400 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default SkillCard;