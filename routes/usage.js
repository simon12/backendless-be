const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");
const authMiddleware = require("../middleware/auth");

router.get("/", usageController.getUsage);

module.exports = router;
