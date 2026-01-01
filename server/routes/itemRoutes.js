const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// 🔥 Cloudinary multer
const upload = require('../config/cloudinaryStorage');

const {
  addItem,
  getItems,
  getItemById,
  deleteItem,
  getMyItems,
  getFeaturedItems,
  buyItem,
  getStats,
} = require('../controllers/itemController');

// --- ROUTES ---

// CREATE ITEM (IMAGE UPLOAD FIXED)
router.post("/", protect, upload.single("image"), addItem);

// STATIC GET ROUTES (MOST SPECIFIC FIRST)
router.get("/featured", getFeaturedItems);
router.get("/stats", getStats);
router.get("/my-items", protect, getMyItems);

// GENERAL GET ALL
router.get("/", getItems);

// DYNAMIC (ALWAYS LAST)
router.get("/:id", getItemById);

// ACTIONS
router.delete("/:id", protect, deleteItem);
router.patch("/buy/:id", protect, buyItem);

module.exports = router;
