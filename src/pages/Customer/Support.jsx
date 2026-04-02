import React, { useState } from "react";

function Support() {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!msg.trim()) {
      setStatus("❌ Please enter your issue");
      return;
    }

    setStatus("✅ Your request has been submitted!");
    setMsg("");

    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* 🔹 HEADER */}
      <h2 className="text-2xl font-bold mb-2">Support Center</h2>
      <p className="text-gray-500 mb-6">
        We're here to help you with your solar system issues and queries.
      </p>

      {/* 🔹 CONTACT INFO */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">📞 Phone</p>
          <p className="font-semibold">+91 6300697301</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">📧 Email</p>
          <p className="font-semibold">nivas@solar.com</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">⏰ Working Hours</p>
          <p className="font-semibold">9 AM - 7 PM</p>
        </div>

      </div>

      {/* 🔹 FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-4">
          Raise a Support Request
        </h3>

        {/* STATUS MESSAGE */}
        {status && (
          <p className="mb-3 text-sm text-blue-600">{status}</p>
        )}

        <textarea
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Describe your issue in detail..."
          rows="4"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
          Submit Request
        </button>

      </form>

    </div>
  );
}

export default Support;