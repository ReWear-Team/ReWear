import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SIZE_BY_CATEGORY = {
  Tops: ["XS", "S", "M", "L", "XL"],
  Pants: ["28", "30", "32", "34", "36", "38", "40"],
  Shoes: ["6", "7", "8", "9", "10", "11"],
  Bags: ["One Size"],
  Watches: ["One Size"],
  Jewelry: ["One Size"],
  Accessories: ["One Size"],
};

const AddItem = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    size: "",
    condition: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const autoSize =
        ["Bags", "Watches", "Jewelry", "Accessories"].includes(value)
          ? "One Size"
          : "";
      setForm({ ...form, category: value, size: autoSize });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please upload an image.");

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("image", image);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/items`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item added successfully!");
      navigate("/explore");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading item.");
    }
  };

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Item
        </h1>
        <p className="text-gray-500 mb-8">
          Upload your fashion item to the Re-Wear marketplace
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          {/* Brand */}
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-lg h-28"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
            required
          >
            <option value="">Select category</option>
            {Object.keys(SIZE_BY_CATEGORY).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          {/* Size */}
          <select
            name="size"
            value={form.size}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
            required
          >
            <option value="">Select size</option>
            {form.category &&
              SIZE_BY_CATEGORY[form.category].map((s) => (
                <option key={s}>{s}</option>
              ))}
          </select>

          {/* Condition */}
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
            required
          >
            <option value="">Select condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Used</option>
          </select>

          {/* Image */}
          <input type="file" accept="image/*" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-48 h-48 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#d46b4a] text-white py-3 rounded-lg text-lg"
          >
            Submit Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
