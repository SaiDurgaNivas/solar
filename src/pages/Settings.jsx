import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings as SettingsIcon, Save, RefreshCw, Activity, Moon, Zap, Globe, Check } from "lucide-react";

function Settings() {
  const [settings, setSettings] = useState({
    realtime: true,
    autoRefresh: true,
    darkMode: true,
    efficiency: 75,
    timezone: "IST (UTC+5:30)",
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => setSettings({ ...settings, [key]: !settings[key] });
  const handleSlider = (e) => setSettings({ ...settings, efficiency: e.target.value });
  const handleTimezone = (e) => setSettings({ ...settings, timezone: e.target.value });

  const handleSave = () => {
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
      {/* Background Decor */}
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
            <p className="text-gray-400 text-sm">Configure your solar dashboard experience</p>
          </div>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden">
          
          <div className="space-y-2 relative z-10">
            {/* 🔹 Real-time Monitoring */}
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

            {/* 🔹 Auto Refresh */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 border-b border-light/5 hover:bg-white/[0.02] -mx-8 px-8 transition-colors">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><RefreshCw className="w-5 h-5" /></div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">Auto Refresh Charts</p>
                  <p className="text-gray-500 text-sm">Automatically sync analytics every 30s</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("autoRefresh")}
                className={`min-w-[60px] h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  settings.autoRefresh ? "bg-gradient-to-r from-orange-500 to-yellow-500" : "bg-gray-700"
                } shadow-inner focus:outline-none`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  settings.autoRefresh ? "translate-x-7" : "translate-x-0"
                }`} />
              </button>
            </motion.div>

            {/* 🔹 Dark Mode */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 border-b border-light/5 hover:bg-white/[0.02] -mx-8 px-8 transition-colors">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Moon className="w-5 h-5" /></div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">Cinematic Interface</p>
                  <p className="text-gray-500 text-sm">Force dark mode styling application-wide</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("darkMode")}
                className={`min-w-[60px] h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  settings.darkMode ? "bg-gradient-to-r from-orange-500 to-yellow-500" : "bg-gray-700"
                } shadow-inner focus:outline-none`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  settings.darkMode ? "translate-x-7" : "translate-x-0"
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
                  type="range"
                  min="50"
                  max="100"
                  value={settings.efficiency}
                  onChange={handleSlider}
                  className="w-full sm:w-40 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
            </motion.div>

            {/* 🔹 Timezone */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 border-b border-light/5 hover:bg-white/[0.02] -mx-8 px-8 transition-colors">
               <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400"><Globe className="w-5 h-5" /></div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">Regional Timezone</p>
                  <p className="text-gray-500 text-sm">Display analytics based on facility location</p>
                </div>
              </div>
              <select
                value={settings.timezone}
                onChange={handleTimezone}
                className="bg-[#020617] border border-white/10 text-gray-300 font-medium px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-inner w-full sm:w-auto appearance-none"
              >
                <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
                <option value="UTC">UTC (Universal)</option>
                <option value="PST">PST (Pacific)</option>
                <option value="EST">EST (Eastern)</option>
              </select>
            </motion.div>
          </div>

          {/* 🔹 Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-end gap-4 mt-10 pt-4">
            <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors w-full sm:w-auto">
              Restore Defaults
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-orange-500 text-black font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] w-full sm:w-auto"
            >
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.div
                    key="saved"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Save className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              {saved ? "Saved!" : "Store Preferences"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Settings;