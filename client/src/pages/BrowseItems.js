import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  // CATEGORY LIST
  const defaultCategories = [
    { name: "Clothing", icon: "👕" },
    { name: "Shoes", icon: "👟" },
    { name: "Bags", icon: "👜" },
    { name: "Watches", icon: "⌚" },
    { name: "Jewelry", icon: "💍" },
    { name: "Accessories", icon: "🧣" },
  ];

  const getCount = (cat) => items.filter((i) => i.category === cat).length;

  // FETCH ITEMS
  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/items");
      const data = await res.json();

      if (!Array.isArray(data)) return;

      setItems(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // FILTERING
  useEffect(() => {
    let result = [...items];

    if (search.trim()) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (size) {
      result = result.filter((item) => item.size === size);
    }

    setFiltered(result);
  }, [search, category, size, items]);

  // BUY ITEM
  const handleBuy = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to buy items.");

    const res = await fetch(
      `http://localhost:5000/api/items/buy/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    alert(data.msg);
    fetchItems();
  };

  const uniqueSizes = [...new Set(items.map((i) => i.size))];

  return (
    <div className="min-h-screen bg-white pt-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Shop by Category
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Explore curated collections across all fashion categories.
        </p>

        {/* CATEGORY GRID */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {defaultCategories.map((c) => (
            <button
              key={c.name}
              onClick={() => setCategory(c.name)}
              className={`bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex flex-col items-center border 
              ${
                category === c.name
                  ? "border-green-600 shadow-2xl"
                  : "border-gray-200"
              }`}
            >
              <span className="text-4xl">{c.icon}</span>
              <span className="mt-3 font-semibold text-gray-900">{c.name}</span>
              <span className="text-gray-400 text-sm">
                {getCount(c.name)} items
              </span>
            </button>
          ))}
        </div>

        {/* SEARCH + FILTERS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 border rounded-lg w-full focus:ring-2 focus:ring-black outline-none"
          />

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="px-4 py-3 border rounded-lg w-full focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">All Sizes</option>
            {uniqueSizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setCategory("");
              setSize("");
              setSearch("");
              setFiltered(items);
            }}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg w-full"
          >
            Reset Filters
          </button>
        </div>

        {/* JUST DROPPED */}
        <h2 className="text-3xl font-semibold text-gray-900 mt-16">
          Just Dropped
        </h2>
        <p className="text-gray-500 mb-6">Fresh finds from our community</p>

        {/* ITEMS GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No items available in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
            {filtered.map((item) => (
              <ItemCard key={item._id} item={item} handleBuy={handleBuy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseItems;
