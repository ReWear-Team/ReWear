import React, { useState } from "react";

const AddItem = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
    availability: "Available",
  });

  const [ , setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Item submitted!");
    // Will integrate backend API next
  };

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
        <p className="text-gray-500 mb-8">
          Upload your fashion item to the Re-Wear marketplace
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Men's Jacket"
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your item..."
              className="w-full mt-2 px-4 py-3 border rounded-lg h-28 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* CATEGORY & SIZE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              >
                <option value="">Select category</option>
                <option>Clothing</option>
                <option>Shoes</option>
                <option>Bags</option>
                <option>Watches</option>
                <option>Jewelry</option>
                <option>Accessories</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-gray-700">Size</label>
              <select
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              >
                <option value="">Select size</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="font-medium text-gray-700">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            >
              <option value="">Select condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full mt-2"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-4 w-48 h-48 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#d46b4a] hover:bg-[#bf5839] text-white py-3 rounded-lg font-semibold text-lg shadow transition"
          >
            Submit Item
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddItem;
