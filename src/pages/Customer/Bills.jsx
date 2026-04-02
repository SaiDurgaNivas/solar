import React, { useEffect, useState } from "react";

function Bills() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 🔥 Check localStorage first
    const storedBills = JSON.parse(localStorage.getItem("bills"));

    if (storedBills && storedBills.length > 0) {
      setBills(storedBills);
    } else {
      const data = [
        { id: 1, billNo: "B001", date: "2026-03-01", units: 120, amount: 1500, loan: 500, subsidy: 200, downpayment: 800, status: "Paid" },
        { id: 2, billNo: "B002", date: "2026-03-10", units: 95, amount: 1100, loan: 400, subsidy: 150, downpayment: 550, status: "Unpaid" },
        { id: 3, billNo: "B003", date: "2026-03-15", units: 140, amount: 1800, loan: 700, subsidy: 300, downpayment: 800, status: "Paid" },
        { id: 4, billNo: "B004", date: "2026-03-20", units: 80, amount: 900, loan: 300, subsidy: 100, downpayment: 500, status: "Unpaid" },
      ];

      setBills(data);

      // 🔥 Save initial data
      localStorage.setItem("bills", JSON.stringify(data));
    }
  }, []);

  const filteredBills = bills.filter((bill) =>
    bill.billNo.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 TOTAL PAID AMOUNT
  const totalPaid = bills
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + b.amount, 0);

  // 🔥 PAY FUNCTION (UPDATED WITH STORAGE)
  const handlePay = (id) => {
    const updated = bills.map((bill) =>
      bill.id === id ? { ...bill, status: "Paid" } : bill
    );

    setBills(updated);

    // 🔥 Save updated bills
    localStorage.setItem("bills", JSON.stringify(updated));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Bills</h1>
          <p className="text-gray-500 text-sm">
            Track your electricity usage and payments
          </p>
        </div>

        <input
          type="text"
          placeholder="Search bill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Bills</p>
          <h2 className="text-xl font-bold">{bills.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Paid</p>
          <h2 className="text-xl font-bold text-green-600">
            {bills.filter(b => b.status === "Paid").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-xl font-bold text-red-500">
            {bills.filter(b => b.status === "Unpaid").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Paid Amount</p>
          <h2 className="text-xl font-bold text-blue-600">₹{totalPaid}</h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-6">

        {filteredBills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No bills found 🔍</p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-gray-600 text-sm">
                  <th className="p-3">Bill No</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Units</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Loan</th>
                  <th className="p-3">Subsidy</th>
                  <th className="p-3">Down Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="border-b hover:bg-gray-50 transition">

                    <td className="p-3 font-medium">{bill.billNo}</td>
                    <td className="p-3 text-gray-600">{bill.date}</td>
                    <td className="p-3">{bill.units}</td>
                    <td className="p-3 font-semibold">₹{bill.amount}</td>

                    <td className="p-3 text-blue-600">₹{bill.loan}</td>
                    <td className="p-3 text-green-600">₹{bill.subsidy}</td>
                    <td className="p-3 text-purple-600">₹{bill.downpayment}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bill.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {bill.status === "Unpaid" && (
                        <button
                          onClick={() => handlePay(bill.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Pay
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Bills;