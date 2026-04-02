import React, { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "⚠️ Panel #12 has a fault",
      time: "2 mins ago",
      type: "error",
    },
    {
      id: 2,
      message: "👤 New customer registered",
      time: "10 mins ago",
      type: "info",
    },
    {
      id: 3,
      message: "⚡ Energy production increased today",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 4,
      message: "🔧 Maintenance request submitted",
      time: "3 hours ago",
      type: "warning",
    },
  ]);

  const getColor = (type) => {
    switch (type) {
      case "error":
        return "border-red-500 bg-red-100 text-red-700";
      case "success":
        return "border-green-500 bg-green-100 text-green-700";
      case "warning":
        return "border-yellow-500 bg-yellow-100 text-yellow-700";
      default:
        return "border-blue-500 bg-blue-100 text-blue-700";
    }
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {/* 🔹 Top Actions */}
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">
          Total Notifications: {notifications.length}
        </p>

        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Clear All
        </button>
      </div>

      {/* 🔹 Notifications List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div
              key={note.id}
              className={`p-4 border-l-4 rounded shadow ${getColor(note.type)}`}
            >
              <p className="font-semibold">{note.message}</p>
              <span className="text-sm text-gray-600">{note.time}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No notifications available
          </p>
        )}
      </div>
    </div>
  );
}

export default Notifications;