const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist");

// ===============================
// GET USER WISHLIST
// ===============================
router.get("/", protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user })
      .populate("item"); // 👈 fetch item details

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error fetching wishlist" });
  }
});

// ===============================
// ADD TO WISHLIST
// ===============================
router.post("/add/:id", protect, async (req, res) => {
  try {
    const itemId = req.params.id;

    const exists = await Wishlist.findOne({
      user: req.user,
      item: itemId,
    });

    if (exists) {
      return res.status(400).json({ msg: "Already in wishlist!" });
    }

    await Wishlist.create({
      user: req.user,
      item: itemId,
    });

    res.json({ msg: "Added to wishlist!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===============================
// REMOVE FROM WISHLIST
// ===============================
router.delete("/remove/:id", protect, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      user: req.user,
      item: req.params.id,
    });

    res.json({ msg: "Removed from wishlist!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error removing wishlist" });
  }
});

module.exports = router;
