import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Activity, Zap, CheckCircle, PlusCircle, PenTool, FileText, Bell } from "lucide-react";
import api from "../../api/axiosConfig";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalInstallations: 0,
    energyGenerated: 0,
    activeSystems: 0,
  });
  
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [customersRes, installationsRes, billsRes] = await Promise.all([
                api.get('users/?role=customer'),
                api.get('installations/'),
                api.get('bills/')
            ]);
            
            const customers = customersRes.data;
            const installations = installationsRes.data;
            const bills = billsRes.data;

            const activeSystems = installations.filter(item => item.status === "Active" || item.status === "Completed").length;
            const totalEnergy = installations.reduce((acc, curr) => acc + 5, 0); // Mock 5kW per system

            setStats({
                totalCustomers: customers.length,
                totalInstallations: installations.length,
                energyGenerated: totalEnergy,
                activeSystems
            });

            // GENERATE PLAIN ENGLISH NOTIFICATIONS
            let notifs = [];

            // 1. Installation Notifications
            installations.forEach(inst => {
                notifs.push({
                    id: `inst-${inst.id}`,
                    icon: PenTool, color: "text-orange-400", bg: "bg-orange-500/10",
                    title: "New Installation Requested",
                    message: `Customer ${inst.client_name || 'unknown'} has requested a new solar installation for their property.`,
                    tag: inst.status
                });
            });

            // 2. Billing Notifications
            bills.forEach(bill => {
                const isPaid = bill.status === "Paid";
                notifs.push({
                    id: `bill-${bill.id}`,
                    icon: FileText, color: isPaid ? "text-green-400" : "text-blue-400", bg: isPaid ? "bg-green-500/10" : "bg-blue-500/10",
                    title: isPaid ? "Payment Received" : "Invoice Issued",
                    message: isPaid 
                      ? `Customer ${bill.client_name || 'unknown'} successfully paid their bill of ₹${bill.amount}.`
                      : `A new bill of ₹${bill.amount} was issued to customer ${bill.client_name || 'unknown'}.`,
                    tag: isPaid ? "Completed" : "Pending"
                });
            });

            // Sort by descending ID to simulate "Most Recent First"
            notifs.sort((a,b) => b.id.localeCompare(a.id));
            setNotifications(notifs.slice(0, 5));

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
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans overflow-x-hidden pb-20">
      
      {/* Dashboard Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8" >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          {getGreeting()}, Admin
        </h1>
        <p className="text-gray-400 mt-2">
          Here is what is happening with your solar network today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Customers", value: stats.totalCustomers, icon: Users, color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Total Installations", value: stats.totalInstallations, icon: PenTool, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Estimated Capacity", value: `${stats.energyGenerated} kW`, icon: Zap, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Active Systems", value: stats.activeSystems, icon: CheckCircle, color: "text-blue-400", bg: "bg-blue-500/10" }
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg flex items-center gap-4"
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

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Quick Actions</h3>
          {[
            { to: "/customer", icon: PlusCircle, title: "Add Customer", desc: "Easily register a new client", hover: "hover:border-orange-500" },
            { to: "/installations", icon: Zap, title: "Manage Installations", desc: "View and edit solar arrays", hover: "hover:border-yellow-500" },
            { to: "/billing", icon: FileText, title: "Generate Invoice", desc: "Create a new customer bill", hover: "hover:border-blue-500" }
          ].map((action, i) => (
            <Link key={i} to={action.to} className={`block bg-[#0f172a]/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 ${action.hover} transition group`}>
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

        {/* System Notifications Feed */}
        <div className="lg:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell className="text-orange-400" /> Notifications & Activity
              </h2>
          </div>

          <div className="p-6">
            {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>)}
                </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No recent notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notif, idx) => (
                  <motion.div 
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition"
                  >
                     <div className={`p-3 rounded-xl ${notif.bg} shrink-0`}>
                       <notif.icon className={`w-6 h-6 ${notif.color}`} />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-gray-100">{notif.title}</h3>
                           <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-widest">{notif.tag}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{notif.message}</p>
                     </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;