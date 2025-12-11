import React from "react";

const CategoriesPage = () => {
  const categories = [
    { name: "Clothing", icon: "👕" },
    { name: "Shoes", icon: "👟" },
    { name: "Bags", icon: "👜" },
    { name: "Watches", icon: "⌚" },
    { name: "Jewelry", icon: "💍" },
    { name: "Accessories", icon: "🧣" }
  ];

  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold text-gray-900 text-center">
        Explore Categories 🌈
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Find fashion items from every category
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        {categories.map((c) => (
          <div
            key={c.name}
            className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-5xl">{c.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{c.name}</h3>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CategoriesPage;
