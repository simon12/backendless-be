const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, subscriptionController.getSubscriptionInfo);
router.post("/upgrade", authMiddleware, subscriptionController.upgrade);
router.post("/downgrade", authMiddleware, subscriptionController.downgrade);
router.post(
  "/payment-method",
  authMiddleware,
  subscriptionController.updatePaymentMethod
);

module.exports = router;
