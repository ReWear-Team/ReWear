const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Item = require("../models/Item");

// ===============================
// PLACE ORDER
// ===============================

console.log("🔥 orderRoutes.js LOADED");

router.post("/", protect, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No items to order" });
    }

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * (i.quantity || 1),
      0
    );

    const order = await Order.create({
      user: req.user,
      items: items.map((i) => ({
        item: i.itemId,
        price: i.price,
        quantity: i.quantity || 1,
      })),
      totalAmount,
    });

    // Mark items SOLD
    for (const i of items) {
      await Item.findByIdAndUpdate(i.itemId, {
        status: "Sold",
        soldTo: req.user,
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Order failed" });
  }
});

// ===============================
// GET MY ORDERS
// ===============================
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user })
    .populate("items.item")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// ===============================
// GET ORDER DETAILS
// ===============================
router.get("/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.item")
    .populate("user", "name email");

  if (!order) return res.status(404).json({ msg: "Order not found" });
  if (order.user._id.toString() !== req.user)
    return res.status(403).json({ msg: "Not authorized" });

  res.json(order);
});

// ===============================
// CANCEL ORDER
// ===============================
router.patch("/:id/cancel", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ msg: "Order not found" });
  if (order.user.toString() !== req.user)
    return res.status(403).json({ msg: "Not authorized" });

  if (order.status !== "Placed") {
    return res.status(400).json({ msg: "Order cannot be cancelled" });
  }

  order.status = "Cancelled";
  await order.save();

  // Restore items
  for (const i of order.items) {
    await Item.findByIdAndUpdate(i.item, {
      status: "Available",
      soldTo: null,
    });
  }

  res.json(order);
});

// ===============================
// UPDATE DELIVERY STATUS (DEMO / ADMIN)
// ===============================
router.patch("/:id/status", protect, async (req, res) => {
  const { status } = req.body;
  const allowed = ["Placed", "Shipped", "Delivered"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ msg: "Order not found" });

  order.status = status;
  await order.save();

  res.json(order);
});

module.exports = router;
