
import { User, Mail, Plus, X, Save } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06141B] p-4 relative overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#253745] rounded-full blur-[150px] opacity-30 pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-2xl bg-[#253745]/70 backdrop-blur-xl rounded-[18px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-white/[0.06] relative z-10">
        
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-semibold text-[#CCD0CF] tracking-tight">
            Your Profile
          </h2>
          <p className="text-[#9BA8AB] text-sm">
            Manage your personal details and skill exchange preferences.
          </p>
        </div>

        {/* Purely Visual Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Read-Only Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Read-Only Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#9BA8AB] ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9BA8AB]/60" />
                </div>
                <input 
                  type="text" 
                  value="John Doe"
                  readOnly
                  className="w-full bg-[#11212D]/50 text-[#CCD0CF]/70 rounded-[14px] pl-11 pr-4 py-3.5 outline-none border border-white/[0.02] cursor-not-allowed"
                />
              </div>
            </div>

            {/* Read-Only Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#9BA8AB] ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9BA8AB]/60" />
                </div>
                <input 
                  type="email" 
                  value="name@example.com"
                  readOnly
                  className="w-full bg-[#11212D]/50 text-[#CCD0CF]/70 rounded-[14px] pl-11 pr-4 py-3.5 outline-none border border-white/[0.02] cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/[0.06] my-6" /> {/* Divider */}

          {/* Skills I Offer Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#9BA8AB] ml-1">
              Skills I Offer
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. Python, Guitar"
                className="flex-1 bg-[#11212D] text-[#CCD0CF] placeholder-[#9BA8AB]/40 rounded-[14px] px-4 py-3.5 outline-none border border-white/[0.02] focus:border-[#4A5C6A] focus:bg-[#11212D]/90 transition-all duration-300"
              />
              <button className="bg-[#4A5C6A]/90 hover:bg-[#4A5C6A] text-[#CCD0CF] rounded-[14px] px-5 py-3.5 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] border border-white/[0.06] hover:shadow-lg">
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Add</span>
              </button>
            </div>
            {/* Visual Tags/Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['Python', 'Guitar'].map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#11212D] text-[#CCD0CF] text-sm px-3 py-1.5 rounded-full border border-white/[0.04] shadow-sm">
                  {skill}
                  <button className="text-[#9BA8AB] hover:text-[#CCD0CF] transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills I Want Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#9BA8AB] ml-1">
              Skills I Want
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. Spanish, Chess"
                className="flex-1 bg-[#11212D] text-[#CCD0CF] placeholder-[#9BA8AB]/40 rounded-[14px] px-4 py-3.5 outline-none border border-white/[0.02] focus:border-[#4A5C6A] focus:bg-[#11212D]/90 transition-all duration-300"
              />
              <button className="bg-[#4A5C6A]/90 hover:bg-[#4A5C6A] text-[#CCD0CF] rounded-[14px] px-5 py-3.5 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] border border-white/[0.06] hover:shadow-lg">
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Add</span>
              </button>
            </div>
            {/* Visual Tags/Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['Spanish', 'Chess'].map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#11212D] text-[#CCD0CF] text-sm px-3 py-1.5 rounded-full border border-white/[0.04] shadow-sm">
                  {skill}
                  <button className="text-[#9BA8AB] hover:text-[#CCD0CF] transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Profile Button */}
          <button 
            className="w-full mt-6 bg-[#4A5C6A]/90 hover:bg-[#4A5C6A] text-[#CCD0CF] font-medium rounded-[14px] py-3.5 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] border border-white/[0.06] hover:shadow-lg"
          >
            <Save className="h-4 w-4" />
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;