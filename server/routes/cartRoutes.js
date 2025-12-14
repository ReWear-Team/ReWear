const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");

router.post("/add/:id", protect, async (req, res) => {
  try {
    const itemId = req.params.id;

    const exists = await Cart.findOne({ user: req.user, item: itemId });
    if (exists) return res.json({ msg: "Already in cart!" });

    await Cart.create({ user: req.user, item: itemId });

    res.json({ msg: "Item added to cart!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
