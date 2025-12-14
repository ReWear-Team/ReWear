import React from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const discount = Math.floor(Math.random() * 40 + 10);
  const oldPrice = item.price + Math.floor(item.price * (discount / 100));

  return (
    <Link to={`/item/${item._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-3 relative cursor-pointer">

        {/* Wishlist Icon */}
        <button
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
          onClick={(e) => e.preventDefault()} // prevent opening detail page when clicking heart
        >
          <FiHeart className="text-gray-700 text-xl" />
        </button>

        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <img
              src={`http://localhost:5000${item.imageUrl}`}
              alt={item.title}
              className="w-full h-72 object-cover transform transition duration-500 hover:scale-110"
            />
          </div>

          {/* CONDITION BADGE */}
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            {item.condition || "Like New"}
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

        {/* Category / Brand */}
        <p className="text-gray-500 text-sm">{item.brand || item.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold text-gray-900">${item.price}</span>
          <span className="line-through text-gray-400 text-sm">${oldPrice}</span>
        </div>

        {/* Size */}
        <p className="text-gray-500 text-sm">Size: {item.size}</p>
      </div>
    </Link>
  );
};

export default ItemCard;
