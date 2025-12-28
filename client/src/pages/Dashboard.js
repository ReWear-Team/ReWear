import React, { useEffect, useState, useCallback } from "react";
import { FiEdit2, FiLogOut, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("listings");

  const [myItems, setMyItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ---------------- LOAD USER ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored || !token) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate, token]);

  /* ---------------- FETCH MY LISTINGS ---------------- */
  const fetchMyItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/items/my-items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMyItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching listings", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ---------------- FETCH WISHLIST ---------------- */
  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setWishlist(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ---------------- LOAD TAB DATA ---------------- */
  useEffect(() => {
    if (!token) return;

    if (activeTab === "listings") fetchMyItems();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "wishlist") fetchWishlist();
  }, [activeTab, token, fetchMyItems, fetchOrders, fetchWishlist]);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ---------------- AVATAR (LOCAL ONLY) ---------------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, avatar: reader.result };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto pt-28 px-4">

      {/* ---------------- PROFILE HEADER ---------------- */}
      <div className="bg-white rounded-2xl shadow border p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border shadow"
            />
            <label className="absolute bottom-0 right-0 bg-gray-800 p-2 text-white rounded-full cursor-pointer">
              <FiCamera size={18} />
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">@{user.name.toLowerCase()}</p>
            <p className="mt-1 text-gray-700">
              Fashion lover & sustainable shopper.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="flex items-center gap-2 px-5 py-2 border rounded-xl hover:bg-gray-100 transition"
        >
          <FiEdit2 /> Edit Profile
        </button>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="mt-10 flex gap-10 border-b pb-3 text-gray-600 text-lg font-medium">
        <button
          className={activeTab === "listings" ? "text-black border-b-2 border-black" : ""}
          onClick={() => setActiveTab("listings")}
        >
          My Listings
        </button>

        <button
          className={activeTab === "orders" ? "text-black border-b-2 border-black" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>

        <button
          className={activeTab === "wishlist" ? "text-black border-b-2 border-black" : ""}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist
        </button>
      </div>

      {/* ---------------- TAB CONTENT ---------------- */}
      <div className="mt-10 min-h-[300px]">

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* ---------- MY LISTINGS ---------- */}
        {!loading && activeTab === "listings" && (
          myItems.length === 0 ? (
            <p className="text-gray-500 text-center">
              You haven't uploaded any items yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {myItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  hideWishlist
                  isOwner
                />
              ))}
            </div>
          )
        )}

        {/* ---------- ORDERS ---------- */}
        {!loading && activeTab === "orders" && (
          orders.length === 0 ? (
            <p className="text-gray-500 text-center">
              No orders yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {orders.flatMap((order) =>
                order.items.map((i) => (
                  <ItemCard
                    key={i.item._id}
                    item={i.item}
                    hideWishlist
                  />
                ))
              )}
            </div>
          )
        )}

        {/* ---------- WISHLIST ---------- */}
        {!loading && activeTab === "wishlist" && (
          wishlist.length === 0 ? (
            <p className="text-gray-500 text-center">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {wishlist.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  hideWishlist
                />
              ))}
            </div>
          )
        )}

      </div>

      {/* ---------------- LOGOUT ---------------- */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          <FiLogOut /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
