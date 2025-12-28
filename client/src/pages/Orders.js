import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!Array.isArray(data)) {
        toast.error("Failed to load orders");
        return;
      }

      setOrders(data);
    } catch (err) {
      toast.error("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pt-28 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">Your Orders</h1>

        {/* ---------------- EMPTY STATE ---------------- */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 space-y-6">
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-4xl">
              📦
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No orders yet
            </h2>

            <p className="text-gray-500 max-w-md">
              Once you purchase items, they’ll appear here for tracking and history.
            </p>

            <Link
              to="/explore"
              className="mt-4 px-6 py-3 bg-[#d46b4a] text-white rounded-lg hover:bg-[#bf5839]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* ---------------- ORDERS LIST (future-ready) ---------------- */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {order.items.length} items • ${order.total}
                  </p>
                </div>

                <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
