import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.msg || "Failed to load order");
          return;
        }

        setOrder(data);
      } catch {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token, API, navigate]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) return null;

  const steps = ["Placed", "Shipped", "Delivered"];

  return (
    <div className="max-w-4xl mx-auto pt-28 px-6 pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Order #{order._id.slice(-6)}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to orders
        </button>
      </div>

      {/* STATUS / TIMELINE */}
      <div className="flex items-center gap-4 mb-10">
        {steps.map((step, index) => {
          const isActive = order.status === step;
          const isCompleted =
            steps.indexOf(order.status) > index;

          return (
            <div key={step} className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
              >
                {step}
              </span>

              {index < steps.length - 1 && (
                <span className="w-6 h-[2px] bg-gray-300" />
              )}
            </div>
          );
        })}

        {order.status === "Cancelled" && (
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700">
            Cancelled
          </span>
        )}
      </div>

      {/* ITEMS */}
      <div className="space-y-5">
        {order.items.map(({ item, quantity }) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white p-5 rounded-xl shadow border"
          >
            <div className="flex gap-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-28 object-cover rounded-lg border"
              />

              <div>
                <p className="font-semibold text-lg">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500">
                  {item.brand}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  ${item.price} × {quantity}
                </p>
              </div>
            </div>

            <div className="font-semibold text-lg">
              ${item.price * quantity}
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-semibold">Total</h2>
        <span className="text-2xl font-bold">
          ${order.totalAmount}
        </span>
      </div>

      {/* FOOTER NOTE */}
      {order.status !== "Cancelled" && (
        <p className="text-sm text-gray-400 mt-4">
          You will be notified once the order status updates.
        </p>
      )}
    </div>
  );
};

export default OrderDetails;
