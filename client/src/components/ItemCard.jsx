import React from "react";
import { FiHeart } from "react-icons/fi";

const ItemCard = ({ item, handleBuy }) => {
  const discount = Math.floor(Math.random() * 40 + 10);
  const oldPrice = item.price + Math.floor(item.price * (discount / 100));

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-3 relative">

      {/* Wishlist Icon */}
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition">
        <FiHeart className="text-gray-700 text-xl" />
      </button>

      {/* Image */}
      <div className="relative">
        <img
          src={`https://rewear-z7yj.onrender.com${item.imageUrl}`}
          alt={item.title}
          className="w-full h-72 object-cover rounded-xl"
        />

        {/* CONDITION BADGE */}
        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          Like New
        </span>

        {/* DISCOUNT BADGE */}
        <span className="absolute top-12 left-4 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          -{discount}%
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mt-4">
        {item.title}
      </h3>

      {/* Brand */}
      <p className="text-gray-500 text-sm">{item.category}</p>

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xl font-bold text-gray-900">${item.price}</span>
        <span className="line-through text-gray-400 text-sm">${oldPrice}</span>
      </div>

      {/* Size */}
      <p className="text-gray-500 text-sm">Size: {item.size}</p>
    </div>
  );
};

export default ItemCard;
