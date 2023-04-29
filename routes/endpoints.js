const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const endpointsController = require("../controllers/endpointsController");

console.log(endpointsController.getEndpoints);

router.get("/", isAuthenticated, endpointsController.getEndpoints);
router.post("/", isAuthenticated, endpointsController.createEndpoint);
router.get("/:id", isAuthenticated, endpointsController.getEndpoint);
router.put("/:id", isAuthenticated, endpointsController.updateEndpoint);
router.delete("/:id", isAuthenticated, endpointsController.deleteEndpoint);

module.exports = router;
