
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const Login = () => {

  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/auth/login', form)
      login(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06141B] p-4 relative overflow-hidden">
      
      {/* Subtle ambient glow for the modern SaaS aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#253745] rounded-full blur-[150px] opacity-30 pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-[#253745]/70 backdrop-blur-xl rounded-[18px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-white/[0.06] relative z-10">
        
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-semibold text-[#CCD0CF] tracking-tight">
            Welcome back
          </h2>
          {error && <p>{error}</p>}
          <p className="text-[#9BA8AB] text-sm">
            Enter your details to access your account.
          </p>
        </div>

        {/* Purely Visual Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Input Group */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9BA8AB] ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#9BA8AB] group-focus-within:text-[#CCD0CF] transition-colors duration-300" />
              </div>
              <input
                onChange={handleChange}
                name='email'
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-[#11212D] text-[#CCD0CF] placeholder-[#9BA8AB]/40 rounded-[14px] pl-11 pr-4 py-3.5 outline-none border border-white/[0.02] focus:border-[#4A5C6A] focus:bg-[#11212D]/90 transition-all duration-300"
              />
            </div>
          </div>

          {/* Password Input Group */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9BA8AB] ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#9BA8AB] group-focus-within:text-[#CCD0CF] transition-colors duration-300" />
              </div>
              <input
                onChange={handleChange}
                name='password'
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#11212D] text-[#CCD0CF] placeholder-[#9BA8AB]/40 rounded-[14px] pl-11 pr-4 py-3.5 outline-none border border-white/[0.02] focus:border-[#4A5C6A] focus:bg-[#11212D]/90 transition-all duration-300"
              />
            </div>
          </div>

          {/* Login Button */}
          <button 
            className="w-full mt-4 bg-[#4A5C6A]/90 hover:bg-[#4A5C6A] text-[#CCD0CF] font-medium rounded-[14px] py-3.5 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] border border-white/[0.06] hover:shadow-lg"
          >
            Login
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-[#9BA8AB] text-sm">
            Don't have an account?{' '}
            <Link to={"/register"}
              className="text-[#CCD0CF] hover:text-white font-medium transition-colors duration-300 underline-offset-4 hover:underline"
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