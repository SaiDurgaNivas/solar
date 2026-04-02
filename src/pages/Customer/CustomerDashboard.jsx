import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axiosConfig";
import { Zap, MapPin, Phone, Mail, Box, ShieldCheck, Activity } from "lucide-react";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [installations, setInstallations] = useState([]);
  
  const [form, setForm] = useState({
    systemSize: "",
    installationType: "",
    roofType: "",
    budget: "",
    preferredDate: "",
    notes: "",
  });

  useEffect(() => {
    // Check local storage routing just like original
    const userStr = localStorage.getItem("solar_user");
    if (!userStr) {
      navigate("/login"); return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "customer") {
      navigate("/login"); return;
    }

    // Fetch this customer's installations
    api.get('installations/').then(res => {
      // Typically in a secure backend we'd filter on the server by token.
      // Doing client filtering for demo logic sake per original structure
      const mines = res.data.filter(i => i.client_name === user.username);
      setInstallations(mines);
    }).catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("solar_user"));
    
    // Instead of booking array, we will create an installation payload directly
    const payload = {
        system: `${form.systemSize} ${form.installationType}`,
        location: "Home Base",
        status: "Pending",
        client: user.id
    };

    try {
        await api.post('installations/', payload);
        alert("✅ Hardware Request Sent to Administration Grid!");
        setForm({
          systemSize: "", installationType: "", roofType: "", budget: "", preferredDate: "", notes: "",
        });
        
        // Refresh grid
        const res = await api.get('installations/');
        setInstallations(res.data.filter(i => i.client_name === user.username));
    } catch(err) {
        alert("Transmission Failed. Are you logged in natively?");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 space-y-8 text-white font-sans overflow-x-hidden">

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500/20 to-yellow-500/5 border border-orange-500/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Zap className="w-48 h-48 text-orange-500 blur-sm" />
        </div>
        <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Node Hub
            </h1>
            <p className="text-gray-400 text-lg mt-2 font-medium">Provision hardware & view telemetry</p>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Request Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-wide">Hardware Provisioning</h2>
            <Box className="w-6 h-6 text-orange-400 opacity-50" />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <select
                className="col-span-2 md:col-span-1 bg-white/5 text-white border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none font-medium"
                value={form.systemSize}
                onChange={(e) => setForm({ ...form, systemSize: e.target.value })}
              >
                <option value="" className="text-black">Substation Capacity</option>
                <option className="text-black" value="1kW">1 kW Tier</option>
                <option className="text-black" value="3kW">3 kW Tier</option>
                <option className="text-black" value="5kW">5 kW Tier</option>
                <option className="text-black" value="10kW">10 kW Tier</option>
              </select>

              <select
                className="col-span-2 md:col-span-1 bg-white/5 text-white border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none font-medium"
                value={form.installationType}
                onChange={(e) => setForm({ ...form, installationType: e.target.value })}
              >
                <option value="" className="text-black">Architecture Type</option>
                <option className="text-black" value="Residential">Residential Sector</option>
                <option className="text-black" value="Commercial">Commercial Sector</option>
              </select>

              <input
                type="date"
                className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-300 font-medium"
                value={form.preferredDate}
                onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Additional Dispatch Notes..."
              className="bg-white/5 border border-white/10 p-4 w-full rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none h-32"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black font-extrabold py-4 rounded-xl transition shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] disabled:opacity-50"
            >
              {loading ? "Transmitting..." : "Initialize Provisioning Sequence"}
            </button>
          </div>
        </motion.div>

        {/* Existing Installs */}
        <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-wide">Active Nodes</h2>
            <Activity className="w-6 h-6 text-green-400 opacity-50" />
          </div>

          <div className="space-y-4">
              {installations.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center opacity-50 border border-dashed border-white/20 rounded-2xl">
                      <ShieldCheck className="w-12 h-12 mb-2" />
                      <p className="font-semibold text-lg">No Active Nodes</p>
                      <p className="text-sm">Provision hardware to see telemetry.</p>
                  </div>
              ) : (
                  installations.map((inst, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition">
                          <div>
                              <p className="font-bold text-lg text-gray-200">{inst.system}</p>
                              <div className="flex gap-4 text-xs font-medium text-gray-500 mt-2 uppercase tracking-wider">
                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> Sector Alpha</span>
                                  <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> Sync: OK</span>
                              </div>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase border ${
                            inst.status === "Active" || inst.status === "Completed"
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : inst.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                            : "bg-orange-500/10 text-orange-400 border-orange-500/30"
                          }`}>
                              {inst.status}
                          </div>
                      </div>
                  ))
              )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default CustomerDashboard;