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
<<<<<<< HEAD
<<<<<<< HEAD

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('size', form.size);
      formData.append('category', form.category);
      formData.append('condition', form.condition);
      formData.append('mode', form.mode);
      if (form.mode === 'points') {
        formData.append('points', form.pointValue);
      }
      formData.append('image', imageFile);
      
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert('Item added successfully!');
        setForm({
          title: '',
          description: '',
          size: '',
          category: '',
          condition: '',
          mode: 'swap',
          pointValue: '',
        });
        setImageFile(null);
        setImagePreview(null);
      } else {
        alert(data.msg || 'Something went wrong.');
      }

    } catch (err) {
      console.error(err);
      alert('Failed to upload item');
    }
=======
    alert("Item submitted!");
    // Will integrate backend API next
>>>>>>> 9cdeb9a (Update frontend)
=======

    if (!image) return alert("Please upload an image.");
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item added successfully!");
      navigate("/explore");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading item.");
    }
>>>>>>> f4da854 (Add Some Features)
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
          <div>
            <label className="font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
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
              className="w-full mt-2 px-4 py-3 border rounded-lg h-28"
              required
            />
          </div>

          {/* Category & Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-lg"
                required
              >
                <option value="">Select category</option>
                <option value="Tops">Tops</option>
                <option value="Pants">Pants</option>
                <option value="Shoes">Shoes</option>
                <option value="Bags">Bags</option>
                <option value="Watches">Watches</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-gray-700">Size</label>
              <select
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-lg"
                required
                disabled={!form.category}
              >
                <option value="">
                  {form.category
                    ? "Select size"
                    : "Select category first"}
                </option>

                {form.category &&
                  SIZE_BY_CATEGORY[form.category]?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
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
              className="w-full mt-2 px-4 py-3 border rounded-lg"
              required
            >
              <option value="">Select condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-2"
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
            className="w-full bg-[#d46b4a] hover:bg-[#bf5839] text-white py-3 rounded-lg text-lg"
          >
            Submit Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
