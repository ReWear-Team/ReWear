const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/authMiddleware');
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

// Create uploads folder if missing
const fs = require('fs');
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// --- ROUTES ---

// CREATE
router.post("/", protect, upload.single("image"), addItem);

// STATIC GET ROUTES (MOST SPECIFIC FIRST)
router.get("/featured", getFeaturedItems);
router.get("/stats", getStats);
router.get("/my-items", protect, getMyItems);

// GENERAL GET ALL (AFTER static)
router.get("/", getItems);

// DYNAMIC (ALWAYS LAST)
router.get("/:id", getItemById);

// ACTIONS
router.delete("/:id", protect, deleteItem);
router.patch("/buy/:id", protect, buyItem);


module.exports = router;
