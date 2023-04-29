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
