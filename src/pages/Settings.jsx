import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings as SettingsIcon, Save, RefreshCw, Activity, Moon, Zap, Globe, Check, Bell, Mail, Phone } from "lucide-react";

function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('solar_admin_settings');
    return saved ? JSON.parse(saved) : {
      realtime: true,
      autoRefresh: true,
      darkMode: true,
      efficiency: 75,
      timezone: "IST (UTC+5:30)",
      alertsEnabled: true,
      adminEmail: "admin@solarsystem.com",
      adminPhone: "+91-9999999999"
    };
  });
  
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => setSettings({ ...settings, [key]: !settings[key] });
  const handleSlider = (e) => setSettings({ ...settings, efficiency: e.target.value });
  const handleInput = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });

  const handleSave = () => {
    localStorage.setItem('solar_admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <SettingsIcon className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Preferences</h1>
            <p className="text-gray-400 text-sm">Configure your solar dashboard experience and dispatch rules</p>
          </div>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden">
          
          <div className="space-y-2 relative z-10">
            {/* 🔹 Core Settings */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 border-b border-light/5 hover:bg-white/[0.02] -mx-8 px-8 transition-colors">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Activity className="w-5 h-5" /></div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">Live Telemetry</p>
                  <p className="text-gray-500 text-sm">Stream panel status data in real-time</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("realtime")}
                className={`min-w-[60px] h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  settings.realtime ? "bg-gradient-to-r from-orange-500 to-yellow-500" : "bg-gray-700"
                } shadow-inner focus:outline-none`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  settings.realtime ? "translate-x-7" : "translate-x-0"
                }`} />
              </button>
            </motion.div>

            {/* 🔹 Efficiency Slider */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 border-b border-light/5 hover:bg-white/[0.02] -mx-8 px-8 transition-colors">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Zap className="w-5 h-5" /></div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">Critical Efficiency Threshold</p>
                  <p className="text-gray-500 text-sm">Alert dispatch when generation drops below value</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                <span className="text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-lg min-w-[3rem] text-center">
                  {settings.efficiency}%
                </span>
                <input
                  type="range" min="50" max="100" value={settings.efficiency} onChange={handleSlider}
                  className="w-full sm:w-40 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </motion.div>

            {/* 🔥 ADVANCED NOTIFICATION ROUTING 🔥 */}
            <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-orange-400" /> Advanced Dispatch Routing
                </h2>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-100">Customer Booking Alerts</p>
                    <p className="text-gray-500 text-sm">Fire an SMS or Email payload to Admin whenever a client books hardware.</p>
                  </div>
                  <button
                    onClick={() => handleToggle("alertsEnabled")}
                    className={`min-w-[60px] h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                      settings.alertsEnabled ? "bg-gradient-to-r from-orange-500 to-yellow-500" : "bg-gray-700"
                    } shadow-inner focus:outline-none`}
                  >
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${settings.alertsEnabled ? "translate-x-7" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-opacity duration-300 ${settings.alertsEnabled ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                   <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Mail className="w-3 h-3"/> Internal Admin Email
                      </label>
                      <input type="email" name="adminEmail" value={settings.adminEmail} onChange={handleInput} className="w-full bg-[#020617] border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-gray-300 font-mono shadow-inner" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Phone className="w-3 h-3"/> Executive SMS Endpoint
                      </label>
                      <input type="text" name="adminPhone" value={settings.adminPhone} onChange={handleInput} className="w-full bg-[#020617] border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-gray-300 font-mono shadow-inner" />
                   </div>
                </div>
            </motion.div>

          </div>

          <motion.div variants={itemVariants} className="flex justify-end gap-4 mt-10 pt-4 border-t border-white/10">
            <button 
              onClick={handleSave}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-orange-500 text-black font-extrabold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] w-full sm:w-auto"
            >
               {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
               {saved ? "Configurations Locked!" : "Store Preferences"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Settings;