import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";

const LandingPage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [stats, setStats] = useState({
  activeItems: 0,
  happySellers: 0,
  totalUsers: 0,
  satisfaction: 0,
});

const fetchStats = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/items/stats`
    );
    const data = await res.json();
    setStats(data);
  } catch (err) {
    console.error("Failed to load stats:", err);
  }
};

useEffect(() => {
  fetchFeaturedItems();
  fetchStats();
}, []);


  const fetchFeaturedItems = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/items/featured`);
      const data = await res.json();
      setFeaturedItems(data);
    } catch (err) {
      console.error("Failed to load featured items:", err);
    }
  };

  const handleBuy = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to buy items.");

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/items/buy/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      alert(data.msg);
      fetchFeaturedItems();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-rose-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
          🌿 Sustainable Fashion Marketplace
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Give Your Fashion a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">
            Second
          </span>{" "}
          <br />
          <span className="text-green-700">Life</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Discover unique pre-loved pieces, sell items you no longer wear, and
          join the sustainable fashion movement.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/explore"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-medium shadow transition"
          >
            Start Shopping →
          </Link>

          <Link
            to="/add-item"
            className="px-6 py-3 border border-gray-300 hover:bg-gray-100 bg-white rounded-lg text-lg font-medium transition"
          >
            Sell Your Items
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
  <Stat number={`${stats.activeItems}+`} label="Active Items" />
  <Stat number={`${stats.happySellers}+`} label="Happy Sellers" />
  <Stat number={`${stats.totalUsers}+`} label="Total Users" />
  <Stat number={`${stats.satisfaction}%`} label="Satisfaction" />
</div>


        <h2 className="mt-16 text-3xl font-bold text-gray-800">
          Featured Items
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredItems.length > 0 ? (
            featuredItems.map((item) => (
              <ItemCard key={item._id} item={item} handleBuy={handleBuy} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg text-gray-500">
                🌱 New items coming soon — be the first to sell!
              </p>
              <Link
                to="/add-item"
                className="inline-block mt-4 px-6 py-3 bg-[#d46b4a] text-white rounded-lg"
              >
                Sell an Item
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-3xl font-bold">{number}</h3>
    <p className="text-gray-500">{label}</p>
  </div>
);

export default LandingPage;
