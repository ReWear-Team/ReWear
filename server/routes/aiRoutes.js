const express = require("express");

const router = express.Router();

const {
  generateDescription,
  smartSearchKeywords
} = require("../controllers/aiController");

router.post("/generate-description", generateDescription);
router.post("/smart-search", smartSearchKeywords);

module.exports = router;