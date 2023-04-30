const express = require("express");
const router = express.Router();
const { clerkAuth } = require("../middleware/auth");
const apiKeysController = require("../controllers/apiKeysController");

router.get("/", clerkAuth, apiKeysController.getApiKey);
router.post("/", clerkAuth, apiKeysController.createApiKey);
router.delete("/:id", clerkAuth, apiKeysController.deleteApiKey);

module.exports = router;
