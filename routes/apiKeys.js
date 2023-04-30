const express = require("express");
const router = express.Router();
const apiKeysController = require("../controllers/apiKeysController");

router.get("/", apiKeysController.getApiKey);
router.post("/", apiKeysController.createApiKey);
router.delete("/", apiKeysController.deleteApiKey);

module.exports = router;
