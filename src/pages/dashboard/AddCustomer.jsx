import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    location: "",
    status: "Active",
  });

  const handleSubmit = () => {
    // 👉 later backend ki send cheyachu
    console.log(customer);

    // after save → back to customers page
    navigate("/customer");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Customer</h1>

      <div className="bg-white p-6 rounded shadow max-w-lg">

        <input
          placeholder="Name"
          className="border p-2 mb-3 w-full"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="border p-2 mb-3 w-full"
          value={customer.location}
          onChange={(e) =>
            setCustomer({ ...customer, location: e.target.value })
          }
        />

        <select
          className="border p-2 mb-4 w-full"
          value={customer.status}
          onChange={(e) =>
            setCustomer({ ...customer, status: e.target.value })
          }
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={() => navigate("/customer")}
          className="ml-3 text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddCustomer;