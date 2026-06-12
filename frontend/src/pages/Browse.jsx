import { useState, useEffect } from "react";
import API from "../api/axios";
import SkillCard from "../components/SkillCard";
import { useAuth } from "../context/AuthContext";

const Browse = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, meRes] = await Promise.all([
          API.get("/users"),
          API.get("/users/me"),
        ]);

        setUsers(usersRes.data);
        setFiltered(usersRes.data);
        setMyProfile(meRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    if (!filterOn && myProfile) {
      const myWanted = myProfile.skillsWanted.map((s) => s.toLowerCase());

      const result = users.filter((u) =>
        u.skillsOffered.some((s) =>
          myWanted.includes(s.toLowerCase())
        )
      );

      setFiltered(result);
    } else {
      setFiltered(users);
    }

    setFilterOn(!filterOn);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1A1A1D] text-white px-4 md:px-8 py-10">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-[#CA2851]/20 blur-[140px]" />

      <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#FFB173]/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          <div>
            <h1 className="text-4xl md:text-5xl leading-normal font-bold bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFE3B3] bg-clip-text text-transparent">
              Browse Users
            </h1>

            <p className="text-gray-400 mt-2">
              Discover people and exchange skills.
            </p>
          </div>

          <button
            onClick={handleFilter}
            className="px-7 py-4 rounded-2xl font-semibold bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] shadow-[0_10px_40px_rgba(255,103,102,0.25)] hover:scale-105 transition-all duration-300"
          >
            {filterOn
              ? "Show All Users"
              : "Who Offers What I Want?"}
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[#FFE3B3]">
            {filtered.length} user{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* User Cards */}
        {filtered.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold text-[#FFE3B3]">
              No users found
            </h2>

            <p className="text-gray-400 mt-3">
              Try turning off the filter or add more skills to your profile.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((u) => (
              <SkillCard key={u._id} userData={u} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;