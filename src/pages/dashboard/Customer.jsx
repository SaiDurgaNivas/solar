import React, { useState } from "react";

function Customers() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [customers, setCustomers] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@gmail.com", location: "Hyderabad", status: "Active" },
    { id: 2, name: "Sita Devi", email: "sita@gmail.com", location: "Bangalore", status: "Inactive" },
    { id: 3, name: "John", email: "john@gmail.com", location: "Chennai", status: "Active" },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    location: "",
    status: "Active",
  });

  // 🔍 Filter
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add Customer
  const handleAddCustomer = () => {
    const newEntry = {
      id: customers.length + 1,
      ...newCustomer,
    };

    setCustomers([...customers, newEntry]);

    setNewCustomer({ name: "", email: "", location: "", status: "Active" });
    setShowForm(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers Management</h1>

      {/* 🔹 Top Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search customer..."
          className="border p-2 rounded w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Customer
        </button>
      </div>

      {/* 🔥 ADD CUSTOMER FORM */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-bold mb-3">Add Customer</h2>

          <input
            placeholder="Name"
            className="border p-2 mb-2 w-full"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="border p-2 mb-2 w-full"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
          />

          <input
            placeholder="Location"
            className="border p-2 mb-2 w-full"
            value={newCustomer.location}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, location: e.target.value })
            }
          />

          <select
            className="border p-2 mb-3 w-full"
            value={newCustomer.status}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, status: e.target.value })
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={handleAddCustomer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() => setShowForm(false)}
            className="ml-2 text-red-500"
          >
            Cancel
          </button>
        </div>
      )}

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-400 p-4 rounded shadow">
          <p>Total Customers</p>
          <h2 className="text-xl font-bold">{customers.length}</h2>
        </div>

        <div className="bg-blue-400 p-4 rounded shadow">
          <p>Active</p>
          <h2 className="text-xl font-bold">
            {customers.filter(c => c.status === "Active").length}
          </h2>
        </div>

        <div className="bg-red-400 p-4 rounded shadow">
          <p>Inactive</p>
          <h2 className="text-xl font-bold">
            {customers.filter(c => c.status === "Inactive").length}
          </h2>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.location}</td>
                <td className={`p-2 font-semibold ${
                  c.status === "Active" ? "text-green-600" : "text-red-600"
                }`}>
                  {c.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No customers found
          </p>
        )}
      </div>
    </div>
  );
}

export default Customers;