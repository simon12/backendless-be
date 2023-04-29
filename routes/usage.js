const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", isAuthenticated, usageController.getUsage);

module.exports = router;
