const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Chat = require("../models/Chat");

router.post("/send", protect, async (req, res) => {
  try {
    const { receiver, item, message } = req.body;

    if (!receiver || !item || !message) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    const chat = await Chat.create({
      sender: req.user,     // user id from JWT
      receiver,
      item,
      message,
    });

    res.status(201).json({
      msg: "Message sent!",
      chat,
    });
  } catch (err) {
    console.error("❌ Chat Error:", err);
    res.status(500).json({ msg: "Server error sending message." });
  }
});

module.exports = router;
