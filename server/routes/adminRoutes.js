const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const {
  getPendingItems,
  approveItem,
} = require('../controllers/adminController');

router.get('/pending-items', protect, adminOnly, getPendingItems);
router.patch('/approve-item/:id', protect, adminOnly, approveItem);

module.exports = router;
