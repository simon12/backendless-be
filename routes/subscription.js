const express = require("express");
const router = express.Router();
const subscriptionsController = require("../controllers/subscriptionsController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", isAuthenticated, subscriptionsController.getSubscriptionInfo);
router.post("/upgrade", isAuthenticated, subscriptionsController.upgrade);
router.post("/downgrade", isAuthenticated, subscriptionsController.downgrade);
router.post(
  "/payment-method",
  isAuthenticated,
  subscriptionsController.updatePaymentMethod
);

module.exports = router;
