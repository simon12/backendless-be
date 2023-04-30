const express = require("express");
const router = express.Router();
const { clerkAuth } = require("../middleware/auth");
const endpointsController = require("../controllers/endpointsController");

console.log(endpointsController.getEndpoints);

router.get("/", clerkAuth, endpointsController.getEndpoints);
router.post("/", clerkAuth, endpointsController.createEndpoint);
router.get("/:id", clerkAuth, endpointsController.getEndpoint);
router.put("/:id", clerkAuth, endpointsController.updateEndpoint);
router.delete("/:id", clerkAuth, endpointsController.deleteEndpoint);
router.post("/:id/save-test-case", clerkAuth, endpointsController.saveTestCase);
router.post("/:id/run-test-case", clerkAuth, endpointsController.runTestCase);

module.exports = router;
