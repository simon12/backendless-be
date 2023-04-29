const { User, Subscription } = require("../models");
const chargebeeService = require("../services/chargebeeService");

exports.getSubscriptionInfo = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscription", error });
  }
};

exports.upgrade = async (req, res) => {
  try {
    const { planId } = req.body;
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Upgrade the subscription in Chargebee
    const chargebeeSubscription = await chargebeeService.updateSubscription(
      subscription.chargebeeId,
      planId
    );

    // Update the local subscription
    const updatedSubscription = await subscription.update({ planId });

    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: "Error upgrading subscription", error });
  }
};

exports.downgrade = async (req, res) => {
  try {
    const { planId } = req.body;
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Downgrade the subscription in Chargebee
    const chargebeeSubscription = await chargebeeService.updateSubscription(
      subscription.chargebeeId,
      planId
    );

    // Update the local subscription
    const updatedSubscription = await subscription.update({ planId });

    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: "Error downgrading subscription", error });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const { paymentMethodToken } = req.body;
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Update the payment method in Chargebee
    await chargebeeService.updatePaymentMethod(
      subscription.chargebeeCustomerId,
      paymentMethodToken
    );

    res.json({ message: "Payment method updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment method", error });
  }
};
