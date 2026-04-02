import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4">Page Not Found</p>

      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;