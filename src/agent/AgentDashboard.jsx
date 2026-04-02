import React from "react";
import { motion } from "framer-motion";
import { Users, Wrench, MapPin, CheckCircle, Clock } from "lucide-react";

const AgentDashboard = () => {

  // 🔥 Dummy Data
  const customers = [
    { id: 1, name: "Ravi Kumar", location: "Hyderabad", status: "Requires Visit" },
    { id: 2, name: "Suresh Reddy", location: "Bangalore", status: "Follow up" },
    { id: 3, name: "Priya Menon", location: "Chennai", status: "Site Survey" }
  ];

  const installations = [
    { id: 1, system: "5KW Solar Setup", status: "Pending", client: "Vikram N.", date: "Tomorrow, 9:00 AM" },
    { id: 2, system: "3KW Off-grid", status: "Completed", client: "Aditi S.", date: "Completed" },
    { id: 3, system: "10KW Commercial", status: "Pending", client: "Sunrise Heights", date: "Friday, 1:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        
        {/* 🔥 Header/Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Field Agent <span className="text-orange-500">Hub</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your daily dispatch, customer sites, and live installations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* 🔥 Customers Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                 <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Assigned Customers</h2>
            </div>
            
            <div className="space-y-4">
              {customers.map((c, idx) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="bg-[#020617] border border-white/5 p-5 rounded-2xl flex justify-between items-center hover:border-blue-500/30 transition-all group"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-blue-400 transition-colors">{c.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                       <MapPin className="w-4 h-4" /> {c.location}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300">
                    {c.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 🔥 Installations Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-orange-500/10 rounded-xl">
                 <Wrench className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold">Installation Queue</h2>
            </div>
            
            <div className="space-y-4">
              {installations.map((i, idx) => (
                <motion.div
                  key={i.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="bg-[#020617] border border-white/5 p-5 rounded-2xl flex flex-col hover:border-orange-500/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{i.system}</h3>
                      <p className="text-gray-500 text-sm">For: <span className="text-gray-300">{i.client}</span></p>
                    </div>
                    {i.status === "Completed" ? (
                       <div className="bg-green-500/10 text-green-400 p-2 rounded-full border border-green-500/20">
                          <CheckCircle className="w-5 h-5" />
                       </div>
                    ) : (
                       <div className="bg-orange-500/10 text-orange-400 p-2 rounded-full border border-orange-500/20">
                          <Clock className="w-5 h-5" />
                       </div>
                    )}
                  </div>
                  
                  <div className="w-full h-px bg-white/5 my-2"></div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-gray-500">{i.date}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                      i.status === 'Completed' ? 'text-green-500 border-green-500/30' : 'text-orange-500 border-orange-500/30'
                    }`}>
                      {i.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;