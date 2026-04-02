import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Search, Users, ShieldCheck, Mail, MapPin } from "lucide-react";
import api from "../../api/axiosConfig";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer"
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('users/?role=customer');
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers directory", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all required credentials.");
      return;
    }
    try {
      await api.post('users/', formData);
      setIsModalOpen(false);
      setFormData({ username: "", email: "", password: "", role: "customer" });
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("Registration failed. Ensure email/username is unique.");
    }
  };

  const filteredList = customers.filter(c => 
    c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#020617] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f172a] border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold tracking-wide">Register Client</h2>
              </div>

              <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 ml-1">Username/ID *</label>
                    <input type="text" name="username" placeholder="solar_client_01" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 text-white outline-none" value={formData.username} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 ml-1">Comm Link (Email) *</label>
                    <input type="email" name="email" placeholder="client@sector.com" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 text-white outline-none" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 ml-1">Initialization Password *</label>
                    <input type="password" name="password" placeholder="••••••••" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 text-white outline-none tracking-widest" value={formData.password} onChange={handleInputChange} />
                  </div>
                  
                  <div className="p-3 border border-orange-500/20 bg-orange-500/5 rounded-xl flex items-start gap-3 mt-4">
                     <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                     <p className="text-xs text-gray-400 leading-relaxed font-medium">This will instantly register the client in the master database and grant them localized access to their personal Node Hub.</p>
                  </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold text-gray-300 transition">Abort</button>
                <button onClick={handleSubmit} className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold hover:from-orange-400 hover:to-yellow-400 transition shadow-lg hover:shadow-orange-500/25">
                  Execute Injection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Client Directory</h1>
          <p className="text-gray-400 mt-1">Manage personnel and consumer profiles</p>
        </motion.div>
        <motion.button 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsModalOpen(true)} 
          className="bg-white/10 border border-white/20 text-white px-5 py-3 rounded-xl hover:bg-white/20 transition flex items-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#0f172a]/60 backdrop-blur-md p-2 rounded-2xl shadow-lg mb-8 border border-white/10 flex items-center gap-3 w-full max-w-md">
         <div className="pl-3"><Search className="w-5 h-5 text-gray-500" /></div>
         <input 
            type="text" 
            placeholder="Query directory..." 
            className="w-full bg-transparent p-2 text-white outline-none placeholder-gray-600" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
         />
      </div>

      <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse">Syncing Directory...</div>
        ) : customers.length === 0 ? (
          <div className="text-center py-20 px-4">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-300 font-bold text-xl">Directory Void</p>
            <p className="text-gray-500 mt-2">Initialize your first client profile.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5 bg-white/5">
                  <th className="py-5 px-6 font-semibold">Client Identity</th>
                  <th className="py-5 px-6 font-semibold">Comm Link</th>
                  <th className="py-5 px-6 font-semibold">Designation</th>
                  <th className="py-5 px-6 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredList.map((item) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    key={item.id} 
                    className="hover:bg-white/5 transition"
                  >
                    <td className="py-5 px-6 font-bold text-gray-200">{item.username}</td>
                    <td className="py-5 px-6 text-gray-400 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" /> {item.email}
                    </td>
                    <td className="py-5 px-6 text-gray-400 text-sm">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-[#9ca3af] text-[10px]">Tier 1 Civilian</span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-bold border bg-green-500/10 text-green-400 border-green-500/20">
                        Active
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;