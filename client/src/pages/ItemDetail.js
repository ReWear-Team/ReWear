import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItem = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/items/${id}`);
      const data = await res.json();
      setItem(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!item) return <div className="text-center py-20 text-gray-600">Item not found</div>;

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to buy this item.");

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/items/buy/${item._id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      alert(data.msg);
      fetchItem();
    } catch {}
  };

  const discount = Math.floor(Math.random() * 40 + 10);
  const originalPrice = item.price ? item.price + Math.floor(item.price * (discount / 100)) : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}${item.imageUrl}`}
            alt={item.title || ""}
            className="rounded-xl object-contain max-h-[500px] w-full transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-3">

          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {item.condition || "Good"}
            </span>

            {originalPrice && (
              <span className="px-4 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                -{discount}%
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.title}</h1>

          <p className="text-gray-600 text-lg mb-5">
            {item.category} • Size {item.size}
          </p>

          <div className="flex items-center gap-3 mb-8">
            <img
              src={`https://ui-avatars.com/api/?name=${item.owner?.name || "User"}&background=random`}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">{item.owner?.name || "Seller"}</p>
              <p className="text-sm text-gray-500">{item.owner?.email}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">{item.description}</p>

          <div className="flex items-end gap-4 mb-6">
            <h2 className="text-4xl font-bold text-gray-900">${item.price}</h2>
            {originalPrice && (
              <span className="line-through text-gray-400 text-lg">${originalPrice}</span>
            )}
          </div>

          {!item.isSold ? (
            <span className="text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">SOLD OUT</span>
          )}

          <div className="mt-10">
            {!item.isSold ? (
              <button
                onClick={handleBuy}
                className="px-10 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition text-lg"
              >
                🛒 Buy Now
              </button>
            ) : (
              <button
                disabled
                className="px-10 py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed text-lg"
              >
                SOLD
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
