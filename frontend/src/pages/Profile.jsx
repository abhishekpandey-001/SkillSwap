import { useState, useEffect } from "react";
import API from "../api/axios.js";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [offeredInput, setOfferedInput] = useState("");
  const [wantedInput, setWantedInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/users/me");

        setProfile(data);
        setSkillsOffered(data.skillsOffered || []);
        setSkillsWanted(data.skillsWanted || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const addOffered = () => {
    if (!offeredInput.trim()) return;
    setSkillsOffered([...skillsOffered, offeredInput.trim()]);
    setOfferedInput("");
  };

  const addWanted = () => {
    if (!wantedInput.trim()) return;
    setSkillsWanted([...skillsWanted, wantedInput.trim()]);
    setWantedInput("");
  };

  const removeSkill = (list, setList, index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await API.put("/users/me", {
        skillsOffered,
        skillsWanted,
      });

      setMessage("Profile saved successfully!");
    } catch (err) {
      setMessage("Failed to save profile");
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#1A1A1D] flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1A1A1D] text-white px-4 md:px-8 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-[#CA2851]/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#FFB173]/20 blur-[140px]" />

      <div className="relative max-w-5xl mx-auto space-y-8">

        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_40px_rgba(255,103,102,0.15)]">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 pb-2 bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFE3B3] bg-clip-text text-transparent">
            My Profile
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-1">Name</p>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                {profile.name}
              </div>
            </div>

            <div>
              <p className="text-gray-400 mb-1">Email</p>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 break-all">
                {profile.email}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_40px_rgba(255,103,102,0.15)]">
          <h2 className="text-2xl font-bold text-[#FFB173] mb-6">
            Skills I Offer
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {skillsOffered.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-[#FF6766]/30 hover:border-[#FF6766] transition-all"
              >
                <span>{skill}</span>

                <button
                  onClick={() =>
                    removeSkill(skillsOffered, setSkillsOffered, i)
                  }
                  className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center transition-all"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={offeredInput}
              onChange={(e) => setOfferedInput(e.target.value)}
              placeholder="e.g. React"
              onKeyDown={(e) => e.key === "Enter" && addOffered()}
              className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#FF6766] focus:ring-2 focus:ring-[#FF6766]/30 transition-all"
            />

            <button
              onClick={addOffered}
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-[#CA2851] to-[#FF6766] shadow-lg hover:scale-105 transition-all"
            >
              Add
            </button>
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_40px_rgba(255,103,102,0.15)]">
          <h2 className="text-2xl font-bold text-[#FFE3B3] mb-6">
            Skills I Want
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {skillsWanted.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-[#FFB173]/30 hover:border-[#FFB173] transition-all"
              >
                <span>{skill}</span>

                <button
                  onClick={() =>
                    removeSkill(skillsWanted, setSkillsWanted, i)
                  }
                  className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center transition-all"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={wantedInput}
              onChange={(e) => setWantedInput(e.target.value)}
              placeholder="e.g. Node.js"
              onKeyDown={(e) => e.key === "Enter" && addWanted()}
              className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#FF6766] focus:ring-2 focus:ring-[#FF6766]/30 transition-all"
            />

            <button
              onClick={addWanted}
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-[#FF6766] to-[#FFB173] shadow-lg hover:scale-105 transition-all"
            >
              Add
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="px-10 py-4 rounded-3xl font-semibold text-lg bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] shadow-[0_10px_40px_rgba(255,103,102,0.25)] hover:scale-105 hover:shadow-[0_15px_50px_rgba(255,103,102,0.35)] transition-all duration-300"
          >
            Save Profile
          </button>
        </div>

        {message && (
          <div className="text-center text-[#FFE3B3] text-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;