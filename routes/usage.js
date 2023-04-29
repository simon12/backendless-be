const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, usageController.getUsageInfo);

module.exports = router;
