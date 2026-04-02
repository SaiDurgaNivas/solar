import React from "react";

function Usage() {
  const totalUnits = 350;
  const monthlyAvg = 120;
  const efficiency = 85;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold">Energy Usage ⚡</h1>
        <p className="text-sm opacity-90">
          Monitor your solar energy consumption and efficiency
        </p>
      </div>

      {/* 🔥 CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Total Units</p>
          <h2 className="text-2xl font-bold">{totalUnits} kWh</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Monthly Average</p>
          <h2 className="text-2xl font-bold">{monthlyAvg} kWh</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Efficiency</p>
          <h2 className="text-2xl font-bold text-green-600">
            {efficiency}%
          </h2>
        </div>

      </div>

      {/* 🔥 PROGRESS BAR */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          System Efficiency
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${efficiency}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Your solar system is performing at {efficiency}% efficiency
        </p>

      </div>

    </div>
  );
}

export default Usage;