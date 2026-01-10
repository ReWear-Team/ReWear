const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// GET CART
// ===============================
router.get("/my", protect, async (req, res) => {

  try {
    const userId = req.user;

    const cart = await Cart.findOne({ user: userId }).populate("items.item");

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
      const existing = cart.items.find(
        (i) => i.item.toString() === itemId
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({ item: itemId, quantity: 1 });
      }
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ user: userId }).populate(
      "items.item"
    );

    res.json(populatedCart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===============================
// UPDATE QUANTITY  ➕➖
// ===============================
router.patch("/update/:itemId", protect, async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (i) => i.item.toString() === itemId
    );

    if (!cartItem) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    cartItem.quantity = Math.max(1, quantity);

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.item"
    );

    res.json(updatedCart);
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===============================
// REMOVE ITEM FROM CART
// ===============================
router.delete("/remove/:itemId", protect, async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => i.item.toString() !== itemId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.item"
    );

    res.json(updatedCart);
  } catch (err) {
    console.error("Remove cart error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===============================
// CLEAR CART  🧹
// ===============================
router.delete("/clear", protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user },
      { items: [] },
      { new: true }
    );

    res.json({ msg: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
