import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Phone } from "lucide-react";

function Profile() {
  const userStr = localStorage.getItem("solar_user");
  const user = userStr ? JSON.parse(userStr) : { name: "Guest User", email: "guest@solar.local", role: "customer" };

  return (
    <div className="bg-[#020617] min-h-screen p-6 font-sans text-white">

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-orange-500/20 via-orange-400/20 to-yellow-500/20 relative">
            <div className="absolute -bottom-12 left-10 p-2 bg-[#020617] rounded-full border border-white/10">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                   <User className="w-12 h-12 text-black" />
                </div>
            </div>
        </div>

        <div className="p-10 pt-16">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-wide">{user.username || user.name}</h1>
              <p className="text-gray-400 font-medium tracking-widest text-sm uppercase mt-1">Solar Identification Protocol</p>
            </div>
            <span className="px-4 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2">
               <Shield className="w-3 h-3" /> clearance: {user.role}
            </span>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition">
              <Mail className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">Comm Link Address</p>
                <p className="text-lg font-medium text-gray-200">{user.email}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition">
              <Phone className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">Encrypted Handheld</p>
                <p className="text-lg font-medium text-gray-400 italic">Unassigned (Require Admin Override)</p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Profile;