import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, Activity, LifeBuoy, UserCog, LogOut } from 'lucide-react';

function CustomerSidebar({ user, onLogout }) {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`;

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem("solar_user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#020617] border-r border-white/10 min-h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50 overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-orange-500/10 blur-[50px] pointer-events-none"></div>

      {/* 🔹 Logo */}
      <div className="h-20 flex items-center justify-center border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2 drop-shadow-lg">
          <span className="text-3xl">☀️</span>
          <h1 className="text-xl font-bold text-white tracking-widest uppercase">
            Solar<span className="text-orange-500">Node</span>
          </h1>
        </div>
      </div>

      {/* 🔹 Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto relative z-10">

        <NavLink to="/customer-dashboard" end className={linkClass}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/customer-dashboard/bills" className={linkClass}>
          <Receipt className="w-5 h-5" />
          Billing Center
        </NavLink>

        <NavLink to="/customer-dashboard/usage" className={linkClass}>
          <Activity className="w-5 h-5" />
          Telemetry
        </NavLink>

        <NavLink to="/customer-dashboard/support" className={linkClass}>
          <LifeBuoy className="w-5 h-5" />
          Support Desk
        </NavLink>

        <NavLink to="/customer-dashboard/profile" className={linkClass}>
          <UserCog className="w-5 h-5" />
          Account Profile
        </NavLink>

      </nav>

      {/* 🔹 User Section */}
      <div className="p-4 border-t border-white/5 bg-white/5 relative z-10">
        {user && (
          <div className="flex items-center gap-3 mb-4 p-2 bg-black/20 rounded-xl border border-white/5 shadow-inner">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center text-black font-extrabold shadow-md">
              {user?.username?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate">
                {user?.username || "Customer"}
              </p>
              <p className="text-orange-400 text-xs font-semibold tracking-widest uppercase">
                Active Client
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
        >
          <LogOut className="w-4 h-4" /> Disconnect
        </button>
      </div>

    </aside>
  );
}

export default CustomerSidebar;
