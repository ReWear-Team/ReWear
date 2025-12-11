import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/not-authorized");
      return;
    }

    const fetchPendingItems = async () => {
      try {
        const res = await fetch(
          "https://rewear-z7yj.onrender.com/api/admin/pending-items",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        setPendingItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch pending items:", err);
        setPendingItems([]);
      }
    };

    fetchPendingItems();
  }, [navigate, token, user]);

  // APPROVE
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `https://rewear-z7yj.onrender.com/api/admin/approve-item/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setPendingItems((prev) => prev.filter((item) => item._id !== id));
        alert("Item approved successfully");
      }
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  // REJECT
  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `https://rewear-z7yj.onrender.com/api/items/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setPendingItems((prev) => prev.filter((item) => item._id !== id));
        alert("Item rejected & removed");
      }
    } catch (err) {
      console.error("Rejection failed:", err);
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🛡️ Admin Panel – Pending Approvals
        </h1>

        {/* NO ITEMS */}
        {pendingItems.length === 0 ? (
          <div className="text-lg bg-green-100 border border-green-300 text-green-700 px-6 py-4 rounded-xl">
            🎉 No pending items! Everything is reviewed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden border"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={`https://rewear-z7yj.onrender.com${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />

                  <span className="absolute top-3 left-3 px-3 py-1 bg-yellow-600 text-white rounded-full text-xs">
                    Pending Review
                  </span>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.category} • {item.condition}
                  </p>

                  <p className="mt-2 text-gray-700">
                    <strong>Owner:</strong> {item.owner?.name || "Unknown"}
                  </p>

                  <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    Mode: {item.mode}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="px-4 py-4 bg-gray-100 flex justify-between">
                  <button
                    onClick={() => handleApprove(item._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(item._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
