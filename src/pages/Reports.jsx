import React from "react";

function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-yellow-400 p-4 rounded shadow">
          <h2 className="text-sm">Total Energy</h2>
          <p className="text-xl font-bold">12,500 kWh</p>
        </div>

        <div className="bg-green-400 p-4 rounded shadow">
          <h2 className="text-sm">Monthly Energy</h2>
          <p className="text-xl font-bold">2,300 kWh</p>
        </div>

        <div className="bg-blue-400 p-4 rounded shadow">
          <h2 className="text-sm">Active Panels</h2>
          <p className="text-xl font-bold">48</p>
        </div>

        <div className="bg-red-400 p-4 rounded shadow">
          <h2 className="text-sm">Fault Panels</h2>
          <p className="text-xl font-bold">3</p>
        </div>

      </div>

      {/* 🔹 Revenue + Efficiency */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Revenue</h2>
          <p className="text-2xl text-green-600 font-bold">₹1,20,000</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Efficiency</h2>
          <p className="text-2xl text-blue-600 font-bold">92%</p>
        </div>

      </div>

      {/* 🔹 Table (Recent Reports) */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Recent Reports</h2>

        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Energy</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-2">10 Mar 2026</td>
              <td className="p-2">500 kWh</td>
              <td className="p-2 text-green-600">Good</td>
            </tr>

            <tr className="border-t">
              <td className="p-2">11 Mar 2026</td>
              <td className="p-2">450 kWh</td>
              <td className="p-2 text-yellow-600">Average</td>
            </tr>

            <tr className="border-t">
              <td className="p-2">12 Mar 2026</td>
              <td className="p-2">300 kWh</td>
              <td className="p-2 text-red-600">Low</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;