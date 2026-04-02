import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function CustomerHeader({ user, onLogout }) { // ✅ onLogout add

  const navigate = useNavigate();

  // 🔥 Active link style
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium transition ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-700 hover:text-orange-500"
    }`;

  // 🔒 Logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // ✅ App state clear
    }

    localStorage.removeItem("solar_user"); // optional safety
    navigate("/login"); // ✅ login page ki redirect
  };

  return (
    <header className="w-full bg-white border-b shadow-sm">

      <div className="flex justify-between items-center px-6 py-3">

        {/* 🔹 LEFT: LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">☀️</span>
          <h1 className="text-lg font-bold">
            Solar<span className="text-orange-500">Customer</span>
          </h1>
        </div>

        {/* 🔹 CENTER: NAVIGATION */}
        <nav className="hidden md:flex gap-4">

          <NavLink to="/customer-dashboard" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/customer-dashboard/bills" className={linkClass}>
            Bills
          </NavLink>

          <NavLink to="/customer-dashboard/usage" className={linkClass}>
            Usage
          </NavLink>

          <NavLink to="/customer-dashboard/support" className={linkClass}>
            Support
          </NavLink>

          <NavLink to="/customer-dashboard/profile" className={linkClass}>
            Profile
          </NavLink>

        </nav>

        {/* 🔹 RIGHT: USER + LOGOUT */}
        <div className="flex items-center gap-4">

          <span className="text-sm font-semibold">
            {user?.username || "Customer"}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default CustomerHeader;