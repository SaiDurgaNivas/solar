import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sun, UserCircle, LogOut } from "lucide-react";

function AgentHeader({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-semibold transition-all ${
      isActive
        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-sm text-white">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* 🔹 LEFT: LOGO */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            <Sun className="text-black w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Field<span className="text-orange-500">Agent</span>
          </h1>
        </div>

        {/* 🔹 CENTER: NAVIGATION */}
        <nav className="hidden md:flex gap-2">
          <NavLink to="/agent-dashboard" end className={linkClass}>
            Hub
          </NavLink>
          {/* We can add more links here later like /agent-installations */}
        </nav>

        {/* 🔹 RIGHT: USER + LOGOUT */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <UserCircle className="text-orange-400 w-8 h-8" strokeWidth={1.5} />
            <div className="hidden sm:block">
               <p className="text-sm font-bold text-gray-100">{user?.name || "Agent"}</p>
               <p className="text-xs text-orange-500 font-mono tracking-wider">ON DUTY</p>
            </div>
          </div>

          <button
             onClick={handleLogout}
             className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/30 text-red-500 hover:text-white px-4 py-2 rounded-xl font-semibold transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Dispatch</span>
          </button>
        </div>

      </div>
    </header>
  );
}

export default AgentHeader;
