import React, { useEffect, useState, useCallback, useMemo} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const SingleItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const authHeaders = useMemo(() => {
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
}, [token]);


  const requireLogin = () => {
    if (!token) {
      toast.error("Please login first!");
      return false;
    }
    return true;
  };

  // ===============================
  // CHECK WISHLIST (SAFE)
  // ===============================
 const checkWishlist = useCallback(
  async (itemId) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/wishlist/check/${itemId}`,
        { headers: authHeaders }
      );

      if (!res.ok) return;

      const data = await res.json();
      setWishlisted(!!data.isWishlisted);
    } catch {
    }
  },
  [token, authHeaders]
);


  // ===============================
  // FETCH ITEM
  // ===============================
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/items/${id}`
        );

        if (!res.ok) {
          toast.error("Item not found");
          return;
        }

        const data = await res.json();
        setItem(data);
        setDiscount(Math.floor(Math.random() * 40 + 10));

        if (token && data?._id) {
          checkWishlist(data._id);
        }
      } catch {
        toast.error("Failed to load item");
      }
    };

    fetchItem();
  }, [id, token, checkWishlist]);

  if (!item) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  const oldPrice = Math.round(
    item.price + item.price * (discount / 100)
  );

  // ===============================
  // BUY NOW
  // ===============================
  const handleBuyNow = async () => {
    if (!requireLogin()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orders`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({
            items: [
              {
                itemId: item._id,
                price: item.price,
              },
            ],
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Order failed");
        return;
      }

      toast.success("Order placed successfully 🎉");
      navigate(`/orders/${data._id}`);
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ADD TO CART
  // ===============================
  const handleAddToCart = async () => {
    if (!requireLogin()) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/cart/add/${item._id}`,
        {
          method: "POST",
          headers: authHeaders,
        }
      );

      if (!res.ok) {
        toast.error("Cart route not found");
        return;
      }

      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Server error");
    }
  };

  // ===============================
  // WISHLIST TOGGLE
  // ===============================
  const handleWishlist = async () => {
    if (!requireLogin()) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/wishlist/toggle/${item._id}`,
        {
          method: "POST",
          headers: authHeaders,
        }
      );

      if (!res.ok) {
        toast.error("Wishlist route not found");
        return;
      }

      const data = await res.json();
      setWishlisted(data.isWishlisted);

      toast.success(
        data.isWishlisted
          ? "Added to wishlist ❤️"
          : "Removed from wishlist"
      );
    } catch {
      toast.error("Server error");
    }
  };

  // ===============================
  // MESSAGE SELLER
  // ===============================
  const handleMessageSeller = async () => {
    if (!requireLogin()) return;

    if (!item?.owner) {
      toast.error("Seller not available");
      return;
    }

    const receiverId =
      typeof item.owner === "object" ? item.owner._id : item.owner;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/chat/send`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({
            receiver: receiverId,
            item: item._id,
            message: "Hi! Is this item still available?",
          }),
        }
      );

      if (!res.ok) {
        toast.error("Failed to send message");
        return;
      }

      toast.success("Message sent to seller");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-28 px-6 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="relative bg-white p-4 rounded-2xl shadow">
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            {item.condition}
          </span>

          <span className="absolute top-12 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            -{discount}% OFF
          </span>

          <div className="w-full aspect-[8/9] overflow-hidden rounded-xl bg-gray-100">
            <img
              src={`${process.env.REACT_APP_BASE_URL}${item.imageUrl}`}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{item.title}</h1>
          <p className="text-gray-600">{item.brand}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${item.price}</span>
            <span className="line-through text-gray-400">${oldPrice}</span>
          </div>

          <p className="text-gray-600">{item.description}</p>

          <div className="flex items-center gap-4">
           <button
  onClick={handleBuyNow}
  className="bg-[#cf6a4d] text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Processing..." : "Buy Now"}
</button>


            <button
              onClick={handleAddToCart}
              className="bg-white border px-6 py-3 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="p-3 border rounded-lg"
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
            className="w-full bg-green-100 text-green-700 py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <FiMessageCircle /> Message Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
