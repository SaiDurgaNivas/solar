import React, { useEffect, useState } from "react";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📩 Customer Bookings</h1>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>System</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.location}</td>
                <td>{b.systemSize}</td>
                <td className="text-yellow-500">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No bookings yet
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;