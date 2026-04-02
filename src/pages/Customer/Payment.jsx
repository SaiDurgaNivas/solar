import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy bill (later dynamic chestham)
  const amount = 1000;

  const handlePayment = () => {
    // 🔥 Update bill status in localStorage
    const bills = JSON.parse(localStorage.getItem("bills")) || [];

    const updated = bills.map((b) =>
      b.id == id ? { ...b, status: "Paid" } : b
    );

    localStorage.setItem("bills", JSON.stringify(updated));

    alert("✅ Payment Successful!");

    navigate("/customer-dashboard/bills");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-center">
          💳 Payment Page
        </h2>

        <p className="text-center mb-4">
          Bill ID: <b>{id}</b>
        </p>

        <p className="text-center mb-6 text-lg">
          Amount: <b>₹{amount}</b>
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}

export default Payment;