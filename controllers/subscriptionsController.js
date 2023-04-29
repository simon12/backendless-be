const { User, Subscription } = require("../models");
const chargebeeService = require("../services/chargebeeService");

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscription", error });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Update the subscription in Chargebee
    const chargebeeSubscription = await chargebeeService.updateSubscription(
      subscription.chargebeeId,
      planId
    );

    // Update the local subscription
    const updatedSubscription = await subscription.update({ planId });

    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription", error });
  }
};
