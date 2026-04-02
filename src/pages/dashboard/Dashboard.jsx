import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Activity, Zap, CheckCircle, PlusCircle, PenTool, FileText } from "lucide-react";
import api from "../../api/axiosConfig";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalInstallations: 0,
    energyGenerated: 0,
    activeSystems: 0,
  });
  
  const [recentInstallations, setRecentInstallations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [customersRes, installationsRes] = await Promise.all([
                api.get('users/?role=customer'),
                api.get('installations/')
            ]);
            
            const customers = customersRes.data;
            const installations = installationsRes.data;

            const activeSystems = installations.filter(item => item.status === "Active").length;
            const totalEnergy = installations.reduce((acc, curr) => acc + 5, 0); // Mock 5kW per system for now

            setStats({
                totalCustomers: customers.length,
                totalInstallations: installations.length,
                energyGenerated: totalEnergy,
                activeSystems
            });

            setRecentInstallations(installations.slice(0, 5));
        } catch (error) {
            console.error("Error fetching admin dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans overflow-x-hidden">
      
      {/* Dashboard Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          {getGreeting()}, Admin
        </h1>
        <p className="text-gray-400 mt-2">
          Here is what's happening with your solar infrastructure today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Customers", value: stats.totalCustomers, icon: Users, color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Total Installations", value: stats.totalInstallations, icon: PenTool, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Total Capacity", value: `${stats.energyGenerated} kW`, icon: Zap, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Active Systems", value: stats.activeSystems, icon: CheckCircle, color: "text-blue-400", bg: "bg-blue-500/10" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg hover:shadow-orange-500/10 transition flex items-center gap-4"
          >
            <div className={`p-4 rounded-full ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-medium">{stat.label}</h2>
              {loading ? (
                <div className="h-8 w-16 bg-white/10 rounded mt-2 animate-pulse"></div>
              ) : (
                <p className="text-3xl font-extrabold text-white mt-1">{stat.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Table */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Quick Actions</h3>
          {[
            { to: "/customers", icon: PlusCircle, title: "Add Customer", desc: "Register a new client", hover: "hover:border-orange-500" },
            { to: "/installations", icon: Zap, title: "New Installation", desc: "Log a solar setup", hover: "hover:border-yellow-500" },
            { to: "/billing", icon: FileText, title: "Generate Invoice", desc: "Create new bill", hover: "hover:border-blue-500" }
          ].map((action, i) => (
            <Link 
              key={i} 
              to={action.to} 
              className={`block bg-[#0f172a]/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 ${action.hover} transition group`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-xl group-hover:bg-white/10 transition">
                  <action.icon className="w-6 h-6 text-gray-300 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-200 group-hover:text-white">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Installations Table */}
        <div className="lg:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-orange-400" /> Recent Activity
              </h2>
              <Link to="/installations" className="text-sm text-orange-400 hover:text-orange-300 font-medium">View All</Link>
          </div>

          <div className="p-6">
            {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse"></div>)}
                </div>
            ) : recentInstallations.length === 0 ? (
              <div className="text-center py-12">
                <PenTool className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No installations found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                      <th className="py-4 px-4 font-semibold">Client</th>
                      <th className="py-4 px-4 font-semibold">System</th>
                      <th className="py-4 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentInstallations.map((install) => (
                      <tr key={install.id} className="hover:bg-white/5 transition group">
                        <td className="py-4 px-4 font-medium text-gray-200">{install.client_name}</td>
                        <td className="py-4 px-4 text-gray-400">{install.system}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            install.status === "Active" || install.status === "Completed"
                            ? "bg-green-500/10 text-green-400 border-green-500/20" 
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}>
                            {install.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;