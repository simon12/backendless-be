const express = require("express");
const router = express.Router();
const customController = require("../controllers/customController");
const customAuthMiddleware = require("../middleware/customAuth");

router.post("/:id", customAuthMiddleware, customController.execute);

module.exports = router;
