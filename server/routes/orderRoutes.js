const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Item = require("../models/Item");


// ===============================
// PLACE ORDER
// ===============================
router.post("/", protect, async (req, res) => {
  try {
    const { items } = req.body; 
    // items = [{ itemId, price }]

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No items to order" });
    }

    const totalAmount = items.reduce((sum, i) => sum + i.price, 0);

    const order = await Order.create({
      user: req.user,
      items: items.map(i => ({
        item: i.itemId,
        price: i.price,
      })),
      totalAmount,
    });

    // Mark items as SOLD
    for (const i of items) {
      await Item.findByIdAndUpdate(i.itemId, {
        status: "Sold",
        soldTo: req.user,
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ msg: "Server error placing order" });
  }
});


// ===============================
// GET MY ORDERS (USER)
// ===============================
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .populate("items.item")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error fetching orders" });
  }
});


// ===============================
// GET SINGLE ORDER
// ===============================
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.item")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (order.user._id.toString() !== req.user) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ===============================
// ADMIN: GET ALL ORDERS (OPTIONAL)
// ===============================
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.item")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
