const Item = require("../models/Item");

// ===============================
// ADD NEW ITEM
// ===============================
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
      imageUrl: `/uploads/${req.file.filename}`,
      owner: req.user, // ✅ actual seller
      status: "Available",
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ Error adding item:", err);
    res.status(500).json({ msg: "Server error while adding item" });
  }
};

// ===============================
// GET ALL ITEMS
// ===============================
const getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "Available" })
      .populate("owner", "name email") // ✅ seller info
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

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

    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching featured items:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

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

module.exports = {
  addItem,
  getItems,
  getFeaturedItems,
  getItemById,
  getMyItems,
  deleteItem,
  buyItem,
};
