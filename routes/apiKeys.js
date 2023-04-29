const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const apiKeysController = require("../controllers/apiKeysController");

router.get("/", isAuthenticated, apiKeysController.getApiKey);
router.post("/", isAuthenticated, apiKeysController.createApiKey);
router.put("/:id", apiKeysController.updateApiKey);
router.delete("/:id", apiKeysController.deleteApiKey);

module.exports = router;
