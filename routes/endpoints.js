const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authentication");
const endpointsController = require("../controllers/endpointsController");
const apiKeysController = require("../controllers/apiKeysController");

router.get("/", isAuthenticated, endpointsController.getAllEndpoints);
router.post("/", isAuthenticated, endpointsController.createEndpoint);
router.get("/:id", isAuthenticated, endpointsController.getEndpoint);
router.put("/:id", isAuthenticated, endpointsController.updateEndpoint);
router.delete("/:id", isAuthenticated, endpointsController.deleteEndpoint);

router.post(
  "/generate-api-key",
  isAuthenticated,
  apiKeysController.createApiKey
);

module.exports = router;
