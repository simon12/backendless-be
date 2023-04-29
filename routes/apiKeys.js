const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const apiKeysController = require("../controllers/apiKeysController");

router.get("/", apiKeysController.getApiKey);
router.post("/", apiKeysController.createApiKey);
router.put("/:id", apiKeysController.updateApiKey);
router.delete("/:id", apiKeysController.deleteApiKey);

module.exports = router;
