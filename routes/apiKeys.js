const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const apiKeysController = require("../controllers/apiKeysController");

router.get("/", isAuthenticated, apiKeysController.getExternalApiKey);
router.post("/", isAuthenticated, apiKeysController.createExternalApiKey);
router.put("/:id", isAuthenticated, apiKeysController.updateExternalApiKey);
router.delete("/:id", isAuthenticated, apiKeysController.deleteExternalApiKey);

module.exports = router;
