const { User, Usage } = require("../models");
const chargebeeService = require("../services/chargebeeService");

exports.getUsage = async (req, res) => {
  try {
    const usage = await Usage.findOne({ where: { userId: req.user.id } });
    res.json(usage);
  } catch (error) {
    res.status(500).json({ message: "Error fetching usage", error });
  }
};

exports.updateUsage = async (req, res) => {
  try {
    const { quantity } = req.body;
    const usage = await Usage.findOne({ where: { userId: req.user.id } });

    if (!usage) {
      return res.status(404).json({ message: "Usage not found" });
    }

    // Update the usage in Chargebee
    const chargebeeUsage = await chargebeeService.updateUsage(
      usage.chargebeeId,
      quantity
    );

    // Update the local usage
    const updatedUsage = await usage.update({ quantity });

    res.json(updatedUsage);
  } catch (error) {
    res.status(500).json({ message: "Error updating usage", error });
  }
};
