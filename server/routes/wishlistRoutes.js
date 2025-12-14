const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist.js");

router.post("/add/:id", protect, async (req, res) => {
    try {
        const itemId = req.params.id;

        const exists = await Wishlist.findOne({
            user: req.user,
            item: itemId
        });

        if (exists) {
            return res.status(400).json({ msg: "Already in wishlist!" });
        }

        await Wishlist.create({
            user: req.user,
            item: itemId
        });

        res.json({ msg: "Added to wishlist!" });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.error(error);
    }
});

router.delete("/remove/:id", protect, async (req, res) => {
    try {
        await Wishlist.findOneAndDelete({
            user: req.user,
            item: req.params.id
        });

        res.json({ msg: "Removed from wishlist!" });

    } catch (error) {
        res.status(500).json({ msg: "Server error removing wishlist" });
        console.error(error);
    }
});

module.exports = router;
