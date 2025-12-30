const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ADD TO CART
router.post("/add/:itemId", protect, async (req, res) => {
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
  res.json({ msg: "Item added to cart" });
});

module.exports = router;
