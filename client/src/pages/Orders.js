import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // ===============================
  // CANCEL / DELETE ORDER
  // ===============================
  const handleCancelOrder = async (orderId) => {
  if (!window.confirm("Cancel this order?")) return;

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("DELETE status:", res.status); // 👈 ADD THIS

    const data = await res.json();
    console.log("DELETE response:", data); // 👈 ADD THIS

    if (!res.ok) {
      toast.error(data.msg || "Failed to cancel order");
      return;
    }

    toast.success("Order cancelled");
    setOrders((prev) => prev.filter((o) => o._id !== orderId));
  } catch (err) {
    console.error(err);
    toast.error("Server error");
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
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const item = order.items[0]?.item;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow border p-5"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold text-lg">
                        Order #{order._id.slice(-6)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium
                        ${
                          order.status === "Placed"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* ITEM INFO */}
                  {item && (
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />

                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.brand}
                        </p>
                        <p className="mt-1 font-bold">
                          ${order.totalAmount}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      {order.status === "Placed" && (
                        <button
                          onClick={() =>
                            handleCancelOrder(order._id)
                          }
                          className="text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
