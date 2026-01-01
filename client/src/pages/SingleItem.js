import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { FiShield, FiTruck, FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-toastify";

const SingleItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);


  const token = localStorage.getItem("token");

  const authHeaders = useMemo(
    () =>
      token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : { "Content-Type": "application/json" },
    [token]
  );

  const requireLogin = () => {
    if (!token) {
      toast.error("Please login first!");
      return false;
    }
    return true;
  };

  // ===============================
  // CHECK WISHLIST
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
      } catch {}
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
    return <div className="pt-32 text-center text-gray-500">Loading...</div>;
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
            items: [{ itemId: item._id, price: item.price }],
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

  if (!item?._id) {
    toast.error("Item not ready");
    return;
  }

  setCartLoading(true);

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/cart/add/${item._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.msg || "Failed to add to cart");
      return;
    }

    toast.success("Added to cart 🛒");
    navigate("/cart");
  } catch (err) {
    console.error(err);
    toast.error("Server error");
  } finally {
    setCartLoading(false);
  }
};

  // ===============================
  // WISHLIST
  // ===============================
  const handleWishlist = async () => {
    if (!requireLogin()) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/wishlist/toggle/${item._id}`,
        { method: "POST", headers: authHeaders }
      );
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

    if (!item?.owner?._id) {
      toast.error("Seller not available");
      return;
    }

    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/chat/send`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          receiver: item.owner._id,
          item: item._id,
          message: "Hi! Is this item still available?",
        }),
      });

      toast.success("Message sent to seller");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-28 px-6 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* IMAGE */}
        <div className="relative">
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
            -{discount}% OFF
          </span>

          <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-md bg-gray-100">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover object-top transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          {/* SELLER */}
          {item.owner && (
            <div className="flex items-center gap-3">
              <img
                src={
                  item.owner.avatar ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(item.owner.name)
                }
                alt={item.owner.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{item.owner.name}</p>
                <Link
                  to={`/user/${item.owner._id}`}
                  className="text-xs text-gray-500 hover:underline"
                >
                  View profile
                </Link>
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold">{item.title}</h1>
          <p className="text-gray-600">{item.category}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${item.price}</span>
            <span className="line-through text-gray-400">${oldPrice}</span>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="bg-[#cf6a4d] text-white px-8 py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>

           <button
  onClick={handleAddToCart}
  disabled={cartLoading}
  className={`border px-6 py-3 rounded-lg transition
    ${cartLoading
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "bg-white hover:bg-gray-50"}
  `}
>
  {cartLoading ? "Adding…" : "Add to Cart"}
</button>


            <button onClick={handleWishlist} className="p-3 border rounded-lg">
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

          {/* TRUST STRIP */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t text-center">
  <div className="flex flex-col items-center gap-2 text-gray-600">
    <FiShield className="text-2xl text-green-600" />
    <span className="text-sm font-medium">Buyer Protection</span>
  </div>

  <div className="flex flex-col items-center gap-2 text-gray-600">
    <FiTruck className="text-2xl text-blue-600" />
    <span className="text-sm font-medium">Fast Shipping</span>
  </div>

  <div className="flex flex-col items-center gap-2 text-gray-600">
    <FiRefreshCcw className="text-2xl text-orange-500" />
    <span className="text-sm font-medium">Easy Returns</span>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default SingleItem;
