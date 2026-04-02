import React, { useEffect, useState } from "react";

function Bills() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = [
      { id: 1, billNo: "B001", date: "2026-03-01", units: 120, amount: 1500, loan: 500, subsidy: 200, downpayment: 800, status: "Paid" },
      { id: 2, billNo: "B002", date: "2026-03-10", units: 95, amount: 1100, loan: 400, subsidy: 150, downpayment: 550, status: "Paid" },
      { id: 3, billNo: "B003", date: "2026-03-15", units: 140, amount: 1800, loan: 700, subsidy: 300, downpayment: 800, status: "Paid" },
      { id: 4, billNo: "B004", date: "2026-03-20", units: 80, amount: 900, loan: 300, subsidy: 100, downpayment: 500, status: "Unpaid" },
    ];
    setBills(data);
  }, []);

  // 🔍 SEARCH
  const filteredBills = bills.filter((bill) =>
    bill.billNo.toLowerCase().includes(search.toLowerCase())
  );

  // 💰 TOTAL PAID
  const totalPaid = bills
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + b.amount, 0);

  // 💳 PAY FUNCTION
  const handlePay = (id) => {
    const updated = bills.map((b) =>
      b.id === id ? { ...b, status: "Paid" } : b
    );
    setBills(updated);
  };

  // 🔥 DOWNLOAD FUNCTION
  const handleDownloadBill = (bill) => {
    const content = `
      <h2>Solar Invoice</h2>
      <hr/>
      <p><b>Bill No:</b> ${bill.billNo}</p>
      <p><b>Date:</b> ${bill.date}</p>
      <p><b>Units:</b> ${bill.units}</p>
      <p><b>Amount:</b> ₹${bill.amount}</p>
      <p><b>Loan:</b> ₹${bill.loan}</p>
      <p><b>Subsidy:</b> ₹${bill.subsidy}</p>
      <p><b>Down Payment:</b> ₹${bill.downpayment}</p>
      <p><b>Status:</b> ${bill.status}</p>
    `;

    const win = window.open("", "", "width=800,height=600");
    win.document.write(`<html><body>${content}</body></html>`);
    win.document.close();
    win.print();
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
          className="border px-4 py-2 rounded-lg"
        />
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Bills</p>
          <h2 className="text-xl font-bold">{bills.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Paid</p>
          <h2 className="text-green-600 font-bold">
            {bills.filter((b) => b.status === "Paid").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Pending</p>
          <h2 className="text-red-500 font-bold">
            {bills.filter((b) => b.status === "Unpaid").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Paid</p>
          <h2 className="text-blue-600 font-bold">₹{totalPaid}</h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-600">
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
              <tr key={bill.id} className="border-b">

                <td className="p-3">{bill.billNo}</td>
                <td className="p-3">{bill.date}</td>
                <td className="p-3">{bill.units}</td>
                <td className="p-3">₹{bill.amount}</td>
                <td className="p-3 text-blue-600">₹{bill.loan}</td>
                <td className="p-3 text-green-600">₹{bill.subsidy}</td>
                <td className="p-3 text-purple-600">₹{bill.downpayment}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    bill.status === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}>
                    {bill.status}
                  </span>
                </td>

                {/* ✅ FIXED ACTION COLUMN */}
                <td className="p-3">
                  <div className="flex gap-2">

                    {bill.status === "Unpaid" && (
                      <button
                        onClick={() => handlePay(bill.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Pay
                      </button>
                    )}

                    <button
                      onClick={() => handleDownloadBill(bill)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Download
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Bills;