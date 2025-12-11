import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) navigate("/login");
    else setUser(stored);
  }, [navigate]);

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto pt-28 px-4">
      <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>

      <label className="block mb-2 font-medium">Name</label>
      <input
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="w-full border px-3 py-2 rounded-lg"
      />

      <label className="block mt-4 mb-2 font-medium">Bio</label>
      <textarea
        value={user.bio || ""}
        onChange={(e) => setUser({ ...user, bio: e.target.value })}
        className="w-full border px-3 py-2 rounded-lg"
      />

      <button
        onClick={saveProfile}
        className="mt-6 bg-[#d46b4a] text-white px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
