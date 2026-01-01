const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// GET CART
// ===============================
router.get("/my", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user })
      .populate("items.item");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===============================
// ADD TO CART
// ===============================
router.post("/add/:itemId", protect, async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.params;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ item: itemId, quantity: 1 }],
      });
    } else {
      const existing = cart.items.find((i) =>
        i.item.equals(itemId)
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({ item: itemId, quantity: 1 });
      }
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.item",
        select: "title price imageUrl brand",
      });

    res.json(populatedCart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
