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
<<<<<<< HEAD
  getFeaturedItems
=======
  getFeaturedItems,
  buyItem
>>>>>>> f4da854 (Add Some Features)
} = require('../controllers/itemController');

// Create uploads folder if missing
const fs = require('fs');
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

<<<<<<< HEAD
// 🔧 Setup multer
=======
// Multer config
>>>>>>> f4da854 (Add Some Features)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

<<<<<<< HEAD
// ✅ Add item with file upload middleware
router.post('/', protect, upload.single('image'), addItem);
router.get('/featured', getFeaturedItems);
router.get('/my-items', protect, getMyItems);
router.get('/', getItems);
router.get('/:id', getItemById);
router.delete('/:id', protect, deleteItem);
=======
// --- ROUTES ---
router.post("/", protect, upload.single("image"), addItem);
router.get("/featured", getFeaturedItems);
router.get("/my-items", protect, getMyItems);
router.get("/", getItems);
router.get("/:id", getItemById);
router.delete("/:id", protect, deleteItem);
router.patch("/buy/:id", protect, buyItem);
>>>>>>> f4da854 (Add Some Features)

module.exports = router;
