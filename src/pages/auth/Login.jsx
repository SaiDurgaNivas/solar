import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import api from "../../api/axiosConfig"; // Axios for Django

function Login({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      // Send authentication request to Django API
      const response = await api.post('auth/login/', { email, password });
      
      const { user, token } = response.data;
      
      // Save token universally
      localStorage.setItem('access_token', token);
      
      // Update global React App state
      onLogin(user);
      
      // Navigate based on assigned role from Database
      if (user.role === 'admin') navigate("/dashboard");
      else if (user.role === 'agent') navigate("/agent-dashboard");
      else navigate("/customer-dashboard");

    } catch (err) {
      setError(err.response?.data?.error || "Invalid Credentials or Server Offline.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const userData = { email: "googleuser@gmail.com", role: "customer", name: "Google User" };
    onLogin(userData);
    navigate("/customer-dashboard");
  };

  return (
    <div className="min-h-screen flex text-white bg-[#020617] overflow-hidden">
      
      {/* LEFT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        {/* Glow effect */}
        <div className="absolute top-0 right-1/2 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-center items-center gap-2 mb-8">
            <Sun className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold tracking-wide">
              Solar<span className="text-orange-500">Admin</span>
            </h1>
          </div>
          
          <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">Sign in to your account to continue</p>

          {/* Role Tabs */}
          <div className="bg-white/5 p-1 rounded-xl flex gap-1 mb-8 border border-white/5">
            {["admin", "agent", "customer"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                  role === r 
                    ? "bg-orange-500 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder={role === "admin" ? "admin@gmail.com" : role === "agent" ? "agent@gmail.com" : "you@example.com"}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-black py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2 group mt-2"
            >
              Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="flex items-center my-8 gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-xl flex items-center justify-center gap-3 transition-colors text-sm font-semibold"
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="google" className="w-5 h-5" />
            Google
          </button>
          
        </motion.div>
      </div>

      {/* RIGHT SIDE: Visual */}
      <div className="hidden lg:flex w-1/2 bg-[#0a1122] relative border-l border-white/5 items-center justify-center p-16">
         {/* Using our generated solar hero image */}
         <img 
            src="/images/solar_hero.png" 
            alt="Solar Panels" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#020617] to-transparent"></div>
         
         <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative z-10 max-w-lg"
         >
           <h2 className="text-4xl font-bold mb-6 leading-tight">The industry standard for solar administration.</h2>
           
           <ul className="space-y-6">
              {[
                "Deploy and track infrastructure with precision.",
                "Real-time grid telemetry and panel health diagnostics.",
                "Frictionless billing and customer CRM routing."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1"><CheckCircle className="w-6 h-6 text-orange-500" /></div>
                  <p className="text-gray-300 text-lg leading-relaxed">{text}</p>
                </li>
              ))}
           </ul>
         </motion.div>
      </div>

    </div>
  );
}

export default Login;