import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) navigate("/login");
    else setUser(JSON.parse(stored));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto pt-28 px-4">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

      <p className="text-gray-500 text-center mt-10">
        No orders yet.
      </p>
    </div>
  );
};

export default Orders;
