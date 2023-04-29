const { User, ApiKey } = require("../models");

exports.getApiKey = async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({ where: { userId: req.user.id } });
    res.json(apiKey);
  } catch (error) {
    res.status(500).json({ message: "Error fetching API key", error });
  }
};

exports.createApiKey = async (req, res) => {
  try {
    const newApiKey = { userId: req.user.id };
    const apiKey = await ApiKey.create(newApiKey);
    res.status(201).json(apiKey);
  } catch (error) {
    res.status(500).json({ message: "Error creating API key", error });
  }
};

exports.updateApiKey = async (req, res) => {
  try {
    const { key } = req.body;
    const [_, updatedApiKey] = await ApiKey.update(
      { key },
      { where: { userId: req.user.id }, returning: true }
    );
    res.json(updatedApiKey[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating API key", error });
  }
};

exports.deleteApiKey = async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({ where: { userId: req.user.id } });

    if (!apiKey) {
      return res.status(404).json({ message: "API key not found" });
    }

    await apiKey.destroy();
    res.json({ message: "API key deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting API key", error });
  }
};
