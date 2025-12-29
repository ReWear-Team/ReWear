import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const SingleItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch( `${process.env.REACT_APP_BASE_URL}/api/items/${id}`);
      const data = await res.json();
      setItem(data);
      setDiscount(Math.floor(Math.random() * 40 + 10));
    };

    fetchItem();
  }, [id]);

  if (!item)
    return <div className="pt-32 text-center text-gray-500">Loading...</div>;

  const oldPrice = Math.round(item.price + item.price * (discount / 100));
  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const requireLogin = () => {
    if (!token) {
      toast.error("Please login first!");
      return false;
    }
    return true;
  };

  // BUY NOW
  const handleBuyNow = async () => {
    if (!requireLogin()) return;

    const res = await fetch(
       `${process.env.REACT_APP_BASE_URL}/api/items/buy/${item._id}`,
      { method: "PATCH", headers: authHeader }
    );

    const data = await res.json();
    toast.success(data.msg);
  };

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!requireLogin()) return;

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/cart/add/${item._id}`,
      { method: "POST", headers: authHeader }
    );

    const data = await res.json();
    toast.success(data.msg);
  };

  // ADD / REMOVE WISHLIST
  const handleWishlist = async () => {
    if (!requireLogin()) return;

    const endpoint = wishlisted
      ?  `${process.env.REACT_APP_BASE_URL}/api/wishlist/remove/${item._id}`
      :  `${process.env.REACT_APP_BASE_URL}/api/wishlist/add/${item._id}`;

    const method = wishlisted ? "DELETE" : "POST";

    const res = await fetch(endpoint, { method, headers: authHeader });
    const data = await res.json();

    toast.success(data.msg);
    setWishlisted(!wishlisted);
  };

  // MESSAGE SELLER
  const handleMessageSeller = async () => {
  if (!requireLogin()) return;

  if (!item?.owner) {
    toast.error("Seller information not available");
    return;
  }

  const receiverId =
    typeof item.owner === "object" ? item.owner._id : item.owner;

  if (!receiverId) {
    toast.error("Invalid seller");
    return;
  }

  const res = await fetch( `${process.env.REACT_APP_BASE_URL}/api/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    body: JSON.stringify({
      receiver: receiverId,
      item: item._id,
      message: "Hi! Is this item still available?",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.msg || "Failed to send message");
    return;
  }

  toast.success("Message sent to seller");
};

  return (
    <div className="max-w-6xl mx-auto pt-28 px-6 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

       {/* LEFT IMAGE */}
<div className="relative bg-white p-4 rounded-2xl shadow">
  <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full z-10">
    {item.condition}
  </span>

  <span className="absolute top-12 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
    -{discount}% OFF
  </span>

  {/* FIXED IMAGE CONTAINER */}
  <div className="w-full aspect-[8/9] overflow-hidden rounded-xl bg-gray-100">
    <img
      src={`${process.env.REACT_APP_BASE_URL}${item.imageUrl}`}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
</div>


        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* Seller */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold">Seller</p>
              <span className="text-gray-500 text-sm cursor-pointer">
                View Profile
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold">{item.title}</h1>
          <p className="text-gray-600">{item.brand}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${item.price}</span>
            <span className="line-through text-gray-400">${oldPrice}</span>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleBuyNow}
              className="bg-[#cf6a4d] text-white px-6 py-3 rounded-lg hover:bg-[#b85a3e]"
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-white border px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="p-3 border rounded-lg hover:bg-gray-100"
            >
              <FiHeart
                className={`text-xl ${
                  wishlisted ? "text-red-500" : "text-gray-700"
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleMessageSeller}
            className="w-full bg-green-100 text-green-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-200"
          >
            <FiMessageCircle /> Message Seller
          </button>

          <div className="grid grid-cols-3 text-center mt-4 text-gray-600">
            <div>
              <p className="text-xl">🛡️</p>
              Buyer Protection
            </div>
            <div>
              <p className="text-xl">🚚</p>
              Fast Shipping
            </div>
            <div>
              <p className="text-xl">🔄</p>
              Easy Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
