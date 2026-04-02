import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("solar_user"));
    setUser(data);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* 🔹 HEADER */}
      <h2 className="text-2xl font-bold mb-2">My Profile</h2>
      <p className="text-gray-500 mb-6">
        Manage your account information and personal details.
      </p>

      {/* 🔹 PROFILE CARD */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-semibold">{user?.username}</h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>

      </div>

      {/* 🔹 EXTRA INFO */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h3 className="text-lg font-semibold mb-4">
          Account Information
        </h3>

        <div className="space-y-2 text-gray-600">
          <p>🔒 Account Status: Active</p>
          <p>📅 Joined: March 2026</p>
          <p>⚡ Solar Plan: Residential</p>
        </div>

      </div>

    </div>
  );
}

export default Profile;