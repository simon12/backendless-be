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
router.post(
  "/:id/save-test-case",
  isAuthenticated,
  endpointsController.saveTestCase
);
router.post(
  "/:id/run-test-case",
  isAuthenticated,
  endpointsController.runTestCase
);

module.exports = router;
