import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchWishlist();
    // eslint-disable-next-line
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!Array.isArray(data)) {
        toast.error("Failed to load wishlist");
        return;
      }

      setWishlist(data);
    } catch (err) {
      toast.error("Error loading wishlist");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pt-28 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">Your Wishlist</h1>

        {/* ---------------- EMPTY STATE ---------------- */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 space-y-6">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-4xl">
              ❤️
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 max-w-md">
              Save items you love and they’ll appear here for quick access later.
            </p>

            <Link
              to="/explore"
              className="mt-4 px-6 py-3 bg-[#d46b4a] text-white rounded-lg hover:bg-[#bf5839]"
            >
              Explore Items
            </Link>
          </div>
        ) : (
          /* ---------------- ITEMS GRID ---------------- */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
