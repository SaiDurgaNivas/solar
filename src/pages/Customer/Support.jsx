import React from "react";
import { motion } from "framer-motion";
import { Headphones, Mail, MessageSquare, Briefcase } from "lucide-react";

function Support() {
  return (
    <div className="bg-[#020617] min-h-screen p-6 font-sans text-white">

      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-4">
            <div className="bg-orange-500/10 p-4 rounded-full border border-orange-500/20">
                <Headphones className="w-10 h-10 text-orange-400" />
            </div>
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent tracking-tight">Signal Dispatch</h1>
        <p className="text-gray-400 mt-3 font-medium text-lg text-balance">
          Need assistance with your solar array? Our engineering team is standing by 24/7/365.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        {[
            { icon: MessageSquare, title: "Comm Link", desc: "Open a direct chat array with an agent.", action: "Start Session", color: "text-blue-400" },
            { icon: Mail, title: "Engineering Desk", desc: "Submit a detailed email diagnostic request.", action: "Create Ticket", color: "text-orange-400" },
            { icon: Briefcase, title: "Hardware Manuals", desc: "Read documentation on grid integration.", action: "Access Library", color: "text-green-400" }
        ].map((block, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center group hover:border-white/20 transition"
              >
                  <block.icon className={`w-10 h-10 ${block.color} mb-4 opacity-80 group-hover:opacity-100 transition`} />
                  <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{block.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow">{block.desc}</p>
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition">
                      {block.action}
                  </button>
             </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Support;