const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist");

// CHECK
router.get("/check/:itemId", protect, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user });
  const isWishlisted = wishlist
    ? wishlist.items.includes(req.params.itemId)
    : false;

  res.json({ isWishlisted });
});

// TOGGLE
router.post("/toggle/:itemId", protect, async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user,
      items: [req.params.itemId],
    });
    return res.json({ isWishlisted: true });
  }

  const index = wishlist.items.findIndex(
    (id) => id.toString() === req.params.itemId
  );

  if (index > -1) {
    wishlist.items.splice(index, 1);
    await wishlist.save();
    return res.json({ isWishlisted: false });
  }

  wishlist.items.push(req.params.itemId);
  await wishlist.save();

  res.json({ isWishlisted: true });
});

// ===============================
// GET MY WISHLIST
// ===============================
router.get("/", protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user })
      .populate("items");

    if (!wishlist) {
      return res.json([]);
    }

    // normalize for frontend
    const data = wishlist.items.map(item => ({
      item
    }));

    res.json(data);
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
