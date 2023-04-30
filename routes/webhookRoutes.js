const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

router.post("/clerk", webhookController.handleClerkWebhook);

module.exports = router;
