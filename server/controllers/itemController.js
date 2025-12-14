<<<<<<< HEAD
// server/controllers/itemController.js
const Item = require('../models/Item');

// @desc    Add new item
=======
const Item = require("../models/Item");

// ===============================
// ADD NEW ITEM
// ===============================
>>>>>>> f4da854 (Add Some Features)
const addItem = async (req, res) => {
  try {
    const {
      title,
      brand,
      price,
      originalPrice,
      size,
      category,
      condition,
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "Image upload is required" });
    }

    if (!title || !brand || !price || !size || !category || !condition) {
      return res.status(400).json({ msg: "All required fields must be filled" });
    }

    const newItem = new Item({
      title,
      brand,
      price,
      originalPrice: originalPrice || price, // ✅ fallback
      size,
      category,
      condition,
      description,
<<<<<<< HEAD
      mode,
      imageUrl: `/uploads/${image.filename}`,
      owner: req.user,
      status: 'Pending',
    });

    await newItem.save();
=======
      imageUrl: `/uploads/${req.file.filename}`,
      owner: req.user, // ✅ actual seller
      status: "Available",
    });

    await newItem.save();

>>>>>>> f4da854 (Add Some Features)
    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ Error adding item:", err);
    res.status(500).json({ msg: "Server error while adding item" });
  }
};

<<<<<<< HEAD
// @desc    Get all available items
const getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'Available' }).populate('owner', 'name');
=======
// ===============================
// GET ALL ITEMS
// ===============================
const getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "Available" })
      .populate("owner", "name email") // ✅ seller info
      .sort({ createdAt: -1 });

>>>>>>> f4da854 (Add Some Features)
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

<<<<<<< HEAD
const getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'Available' }).sort({ createdAt: -1 }).limit(6);
=======
// ===============================
// GET FEATURED ITEMS
// ===============================
const getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.find({
      status: "Available",
      featured: true,
    })
      .populate("owner", "name")
      .sort({ createdAt: -1 })
      .limit(6);

>>>>>>> f4da854 (Add Some Features)
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching featured items:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

<<<<<<< HEAD
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user }).populate('owner', 'name');
    res.json(items);
  } catch (err) {
    console.error('Error fetching my items:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
// @desc    Get item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name email');
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('❌ Error in getItemById:', err);
    res.status(500).json({ msg: 'Server error while fetching item' });
  }
};

// @desc    Delete item (only by owner)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    if (item.owner.toString() !== req.user) {
      return res.status(403).json({ msg: 'Not authorized to delete this item' });
    }

    await item.remove();
    res.json({ msg: 'Item deleted successfully' });
  } catch (err) {
    console.error('❌ Error in deleteItem:', err);
    res.status(500).json({ msg: 'Server error while deleting item' });
  }
};

// ✅ Export all controllers
=======
// ===============================
// GET ITEM BY ID
// ===============================
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("owner", "name email");

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("❌ Error fetching item:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ===============================
// GET MY ITEMS
// ===============================
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching my items:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ===============================
// DELETE ITEM
// ===============================
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    if (item.owner.toString() !== req.user) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await item.deleteOne();
    res.json({ msg: "Item deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ===============================
// BUY ITEM
// ===============================
const buyItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    if (item.status === "Sold") {
      return res.status(400).json({ msg: "Item already sold" });
    }

    item.status = "Sold";
    item.soldTo = req.user;

    await item.save();

    res.json({ msg: "Item purchased successfully!" });
  } catch (err) {
    console.error("❌ Error buying item:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

>>>>>>> f4da854 (Add Some Features)
module.exports = {
  addItem,
  getItems,
  getFeaturedItems,
<<<<<<< HEAD
=======
  getItemById,
  getMyItems,
  deleteItem,
  buyItem,
>>>>>>> f4da854 (Add Some Features)
};
