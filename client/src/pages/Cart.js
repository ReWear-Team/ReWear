import React, { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Always derive items safely
  const items = useMemo(() => {
    return Array.isArray(cart?.items) ? cart.items : [];
  }, [cart]);

  // ===============================
  // FETCH CART
  // ===============================
  const fetchCart = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/cart/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.msg || "Failed to load cart");
        setCart({ items: [] });
        return;
      }

      // ✅ KEEP BACKEND RESPONSE AS-IS
      setCart(data);
    } catch (err) {
      console.error(err);
      toast.error("Server error");
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ===============================
  // AUTH + LOAD
  // ===============================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    fetchCart();
  }, [token, navigate, fetchCart]);

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading your cart...
      </div>
    );
  }

  // ===============================
  // EMPTY CART
  // ===============================
  if (items.length === 0) {
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
  }

  // ===============================
  // TOTAL
  // ===============================
  const total = items.reduce((sum, entry) => {
    if (!entry?.item) return sum;
    return sum + entry.item.price * entry.quantity;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto pt-28 px-6 pb-20">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {items.map(({ item, quantity }) => {
          if (!item) return null;

          return (
            <div
              key={item._id}
              className="flex gap-6 items-center bg-white p-4 rounded-xl shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-500">${item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {quantity}
                </p>
              </div>

              <div className="font-semibold">
                ${item.price * quantity}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-semibold">Total</h2>
        <span className="text-2xl font-bold">${total}</span>
      </div>

      <button
        onClick={() => toast.info("Checkout coming soon 🚀")}
        className="mt-6 w-full bg-[#d46b4a] text-white py-4 rounded-xl text-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
