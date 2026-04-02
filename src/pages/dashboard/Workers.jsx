import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserCheck, UserX, UserMinus, HardHat, PlusCircle, CheckCircle } from "lucide-react";
import api from "../../api/axiosConfig";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchData = async () => {
    try {
      const [workersRes, attendanceRes] = await Promise.all([
        api.get('users/?role=agent'),
        api.get('attendance/')
      ]);
      setWorkers(workersRes.data || []);
      setAttendance(attendanceRes.data || []);
    } catch (err) {
      console.error("Failed to load workers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const markAttendance = async (workerId, status) => {
    try {
      await api.post('attendance/', {
        worker: workerId,
        status: status
      });
      showToast(`Successfully marked ${status}!`);
      fetchData(); // Refresh to show updated log
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast("Attendance already logged for today!");
      } else {
        showToast("Error processing attendance.");
      }
    }
  };

  // Helper to find today's status for a worker
  const getTodayStatus = (workerId) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const record = attendance.find(a => a.worker === workerId && a.date === todayStr);
    return record ? record.status : "Unmarked";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
            <motion.div 
                initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
                className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-bold text-gray-200">{toast}</span>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent flex items-center gap-3">
                 <HardHat className="w-10 h-10 text-orange-400"/> Field Workers & Agents
              </h1>
              <p className="text-gray-400 text-lg mt-2 font-medium">Manage deployment teams and track daily attendance</p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
               <div className="bg-[#0f172a] border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg">
                  <Users className="w-6 h-6 text-blue-400"/>
                  <div>
                     <p className="text-xl font-bold">{workers.length}</p>
                     <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Total Agents</p>
                  </div>
               </div>
            </div>
        </motion.div>

        {/* Workers Table */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
           className="bg-[#0f172a]/80 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white tracking-wide">Daily Attendance Roster</h2>
          </div>

          <div className="p-6 md:p-8">
            {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>)}
                </div>
            ) : workers.length === 0 ? (
              <div className="text-center py-16">
                <HardHat className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400">No Field Workers Found</h3>
                <p className="text-gray-500 mt-2">Create an Agent account to see them appear on this roster.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                      <th className="py-4 px-4 font-semibold w-1/3">Agent Name</th>
                      <th className="py-4 px-4 font-semibold">Today's Status</th>
                      <th className="py-4 px-4 font-semibold text-right">Log Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {workers.map((worker) => {
                      const todayStatus = getTodayStatus(worker.id);
                      
                      // Compute Badge Color Based on Live Status
                      let badgeColor = "bg-gray-500/10 text-gray-400 border-gray-500/20";
                      let StatusIcon = Users;
                      if (todayStatus === "Present") {
                          badgeColor = "bg-green-500/10 text-green-400 border-green-500/20";
                          StatusIcon = UserCheck;
                      } else if (todayStatus === "Absent") {
                          badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
                          StatusIcon = UserX;
                      } else if (todayStatus === "On Leave") {
                          badgeColor = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
                          StatusIcon = UserMinus;
                      }

                      return (
                        <tr key={worker.id} className="hover:bg-white/5 transition group">
                          
                          <td className="py-5 px-4">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-lg">
                                    {worker.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-200 text-lg">{worker.username}</p>
                                    <p className="text-sm text-gray-500">{worker.email}</p>
                                </div>
                             </div>
                          </td>

                          <td className="py-5 px-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold shadow-inner ${badgeColor}`}>
                               <StatusIcon className="w-4 h-4" /> {todayStatus}
                            </div>
                          </td>

                          <td className="py-5 px-4 text-right">
                             <div className="flex justify-end gap-2">
                                <button 
                                    onClick={() => markAttendance(worker.id, "Present")}
                                    className="px-4 py-2 hover:bg-green-500 hover:text-white border border-green-500/30 text-green-400 rounded-lg text-sm font-bold transition"
                                >
                                    Log Present
                                </button>
                                <button 
                                    onClick={() => markAttendance(worker.id, "Absent")}
                                    className="px-4 py-2 hover:bg-red-500 hover:text-white border border-red-500/30 text-red-400 rounded-lg text-sm font-bold transition"
                                >
                                    Force Absent
                                </button>
                                <button 
                                    onClick={() => markAttendance(worker.id, "On Leave")}
                                    className="px-4 py-2 hover:bg-yellow-500 hover:text-black border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-bold transition"
                                >
                                    On Leave
                                </button>
                             </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Workers;
