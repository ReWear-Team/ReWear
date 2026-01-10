import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API = process.env.REACT_APP_BASE_URL;

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
      const res = await fetch(`${API}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CANCEL ORDER
  // ===============================
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      const res = await fetch(`${API}/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.msg || "Failed to cancel order");
        return;
      }

      toast.success("Order cancelled");
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "Cancelled" } : o
        )
      );
    } catch {
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
    <div className="pt-28 px-6 min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const item = order.items[0]?.item;
              const isCancelled = order.status === "Cancelled";

              return (
                <div
                  key={order._id}
                  onClick={() => {
                    if (!isCancelled) {
                      navigate(`/orders/${order._id}`);
                    }
                  }}
                  className={`group bg-white rounded-xl border shadow p-5 transition
                    ${
                      isCancelled
                        ? "opacity-70 cursor-not-allowed bg-gray-50"
                        : "cursor-pointer hover:shadow-md"
                    }`}
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-lg">
                        Order #{order._id.slice(-6)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* STATUS BADGE */}
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium
                        ${
                          order.status === "Placed"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* ITEM */}
                  {item && (
                    <div className="flex items-center gap-5">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-lg">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.brand}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          Total:{" "}
                          <span className="font-semibold">
                            ${order.totalAmount}
                          </span>
                        </p>

                        {/* VIEW DETAILS HINT */}
                        {!isCancelled && (
                          <p className="text-xs text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition">
                            View order details →
                          </p>
                        )}

                        {/* DELIVERY TEXT */}
                        {!isCancelled && (
                          <p className="text-xs text-gray-400 mt-1">
                            {order.status === "Placed" &&
                              "Preparing your order"}
                            {order.status === "Shipped" &&
                              "On the way 🚚"}
                            {order.status === "Delivered" &&
                              "Delivered successfully 🎉"}
                          </p>
                        )}
                      </div>

                      {/* ACTION */}
                      {order.status === "Placed" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelOrder(order._id);
                          }}
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
