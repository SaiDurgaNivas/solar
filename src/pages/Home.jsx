import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart3, Users, Zap, ShieldAlert,
  ArrowRight, FileText, Settings, Sun
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500 selection:text-white font-sans overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-xl bg-[#020617]/50 border-b border-light/5 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sun className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Solar<span className="text-orange-500">Admin</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-8 items-center font-medium">
          <Link to="/" className="text-white hover:text-orange-400 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
          <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)]"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative px-6 md:px-12 min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl relative z-10 pt-12 md:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 fill-current" /> Smart Solar Platform V2.0
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Next-Gen{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Solar Management
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
            Command central for modern energy. Manage field installations, track real-time telemetry, and scale your solar enterprise with unparalleled clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded-full font-bold transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              Access Dashboard 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/about"
              className="border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all text-center backdrop-blur-md"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>

        {/* RIGHT DASHBOARD PREVIEW */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-2xl z-10 Perspective-container"
        >
          {/* Abstract Floating Elements wrapping the image */}
          <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-blue-500/20 blur-3xl opacity-50 rounded-[3rem]"></div>
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl p-2 md:p-4 rotate-x-6 rotate-y-[-10deg] transform-gpu hover:rotate-0 transition-all duration-700 ease-out">
             <div className="flex items-center gap-2 mb-4 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono flex-1 text-center pr-10">dashboard.solaradmin.io</div>
             </div>
             
             {/* Actual Image preview generated from tool */}
             <div className="rounded-xl overflow-hidden border border-white/5 bg-[#020617] aspect-[4/3] md:aspect-video relative">
                <img 
                  src="/images/dashboard_preview.png" 
                  alt="Solar Dashboard Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex'; 
                  }}
                />
                {/* Fallback mockup if image fails to load */}
                <div className="hidden absolute inset-0 flex-col p-6 pointer-events-none">
                   <div className="flex gap-4 mb-6">
                     <div className="h-20 flex-1 bg-white/5 rounded-xl border border-white/5"></div>
                     <div className="h-20 flex-1 bg-white/5 rounded-xl border border-white/5"></div>
                     <div className="h-20 flex-1 bg-white/5 rounded-xl border border-white/5"></div>
                   </div>
                   <div className="flex-1 bg-white/5 rounded-xl border border-white/5"></div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="px-6 md:px-12 py-20 relative z-20">
        <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-10 max-w-7xl mx-auto shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/5">
            {[
              { value: "10K+", label: "Active Customers" },
              { value: "500+", label: "Solar Installations" },
              { value: "25MW", label: "Energy Generated" },
              { value: "99.9%", label: "System Uptime" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center md:px-4"
              >
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{item.value}</h2>
                <p className="text-gray-400 font-medium tracking-wide uppercase text-xs md:text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Scale</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to orchestrate complex solar operations gracefully.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Customer Portal", desc: "Empower users to track their own panel output visually.", icon: <Users /> },
            { title: "Telemetry Analytics", desc: "Live generation tracking and efficiency degradation alerts.", icon: <BarChart3 /> },
            { title: "Automated Billing", desc: "Generate invoices automatically based on power purchase agreements.", icon: <FileText /> },
            { title: "Predictive Alerts", desc: "Identify panel faults before they severely impact total generation.", icon: <ShieldAlert /> }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#0f172a]/30 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 hover:bg-[#0f172a]/80 transition-all group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-orange-400 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-8 border-t border-white/5 text-gray-500 mt-20">
        <p>© {new Date().getFullYear()} SolarAdmin Systems. Empowering global renewable grids.</p>
      </footer>
    </div>
  );
}

export default Home;