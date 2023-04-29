const express = require("express");
const router = express.Router();
const subscriptionsController = require("../controllers/subscriptionsController");
const authMiddleware = require("../middleware/auth");

router.get("/", subscriptionsController.getSubscriptionInfo);
router.post("/upgrade", subscriptionsController.upgrade);
router.post("/downgrade", subscriptionsController.downgrade);
router.post("/payment-method", subscriptionsController.updatePaymentMethod);

module.exports = router;
