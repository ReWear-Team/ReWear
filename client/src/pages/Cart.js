import React, { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_BASE_URL;

  // ===============================
  // SAFE ITEMS
  // ===============================
  const items = useMemo(() => {
    return Array.isArray(cart?.items) ? cart.items : [];
  }, [cart]);

  // ===============================
  // FETCH CART
  // ===============================
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${API_BASE}/api/cart/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCart(res.ok ? data : { items: [] });
    } catch {
      toast.error("Server error");
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [API_BASE, navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ===============================
  // UPDATE QUANTITY ➕➖
  // ===============================
  const updateQuantity = async (itemId, qty) => {
    if (qty < 1) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/cart/update/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ quantity: qty }),
        }
      );

      const data = await res.json();
      if (!res.ok) return toast.error(data.msg);
      setCart(data);
    } catch {
      toast.error("Server error");
    }
  };

  // ===============================
  // REMOVE ITEM
  // ===============================
  const handleRemoveFromCart = async (itemId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/cart/remove/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) return toast.error(data.msg);

      setCart(data);
      toast.success("Item removed");
    } catch {
      toast.error("Server error");
    }
  };

  // ===============================
  // CHECKOUT (AFTER PAYMENT UI)
  // ===============================
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map(({ item, quantity }) => ({
            itemId: item._id,
            quantity,
            price: item.price,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.msg);

      // 🧹 CLEAR CART
      await fetch(`${API_BASE}/api/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Payment successful 🎉");
      navigate(`/orders/${data._id}`);
    } catch {
      toast.error("Server error");
    }
  };

  // ===============================
  // TOTAL
  // ===============================
  const total = items.reduce(
    (sum, e) => sum + e.item.price * e.quantity,
    0
  );

  // ===============================
  // UI STATES
  // ===============================
  if (loading)
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading your cart...
      </div>
    );

  if (items.length === 0)
    return (
      <div className="pt-32 text-center">
        <p className="text-xl text-gray-600 mb-4">
          Your cart is empty 🛒
        </p>
        <button
          onClick={() => navigate("/explore")}
          className="bg-[#d46b4a] text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );

  // ===============================
  // MAIN UI
  // ===============================
  return (
    <>
      <div className="max-w-5xl mx-auto pt-28 px-6 pb-20">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="space-y-6">
          {items.map(({ item, quantity }) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white p-5 rounded-xl shadow"
            >
              <div className="flex gap-5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-32 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">${item.price}</p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, quantity - 1)
                      }
                      className="px-3 py-1 border rounded"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, quantity + 1)
                      }
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      handleRemoveFromCart(item._id)
                    }
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-lg font-semibold">
                ${item.price * quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between border-t pt-6">
          <h2 className="text-xl font-semibold">Total</h2>
          <span className="text-2xl font-bold">${total}</span>
        </div>

        <button
          onClick={() => setShowPayment(true)}
          className="mt-6 w-full bg-[#d46b4a] text-white py-4 rounded-xl text-lg font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* ================= PAYMENT UI ================= */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Payment</h2>

            <input className="w-full border p-2 mb-3 rounded" placeholder="Card Number" />
            <input className="w-full border p-2 mb-3 rounded" placeholder="MM / YY" />
            <input className="w-full border p-2 mb-4 rounded" placeholder="CVV" />

            <button
              onClick={() => {
                setShowPayment(false);
                handleCheckout();
              }}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Pay ${total}
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
