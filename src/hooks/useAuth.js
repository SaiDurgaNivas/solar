import { useState, useEffect } from "react";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 Login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 🚪 Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Check if logged in
  const isAuthenticated = !!user;

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
}

export default useAuth;