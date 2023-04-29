const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const endpointsController = require("../controllers/endpointsController");

console.log(endpointsController.getEndpoints);

router.get("/", endpointsController.getEndpoints);
router.post("/", endpointsController.createEndpoint);
router.get("/:id", endpointsController.getEndpoint);
router.put("/:id", endpointsController.updateEndpoint);
router.delete("/:id", endpointsController.deleteEndpoint);

module.exports = router;
