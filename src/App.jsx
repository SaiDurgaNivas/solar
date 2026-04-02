import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {

  // 🔐 USER STATE (from localStorage)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("solar_user"));
    } catch {
      return null;
    }
  });

  // 🔄 Sync with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("solar_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("solar_user");
    }
  }, [user]);

  // ✅ LOGIN
  const handleLogin = (userData) => {
    setUser(userData);
    // 🔥 ensure save immediately
    localStorage.setItem("solar_user", JSON.stringify(userData));
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("solar_user"); // 🔥 important
  };

  return (
    <Router>
      <AppRoutes 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
    </Router>
  );
}

export default App;