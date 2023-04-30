const express = require("express");
const router = express.Router();
const endpointsController = require("../controllers/endpointsController");

console.log(endpointsController.getEndpoints);

router.get("/", endpointsController.getEndpoints);
router.post("/", endpointsController.createEndpoint);
router.get("/:id", endpointsController.getEndpoint);
router.put("/:id", endpointsController.updateEndpoint);
router.delete("/:id", endpointsController.deleteEndpoint);
router.post("/:id/save-test-case", endpointsController.saveTestCase);
router.post("/:id/run-test-case", endpointsController.runTestCase);

module.exports = router;
