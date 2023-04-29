const { User, Endpoint } = require("../models");

exports.getEndpoints = async (req, res) => {
  try {
    const endpoints = await Endpoint.findAll({
      where: { userId: req.user.id },
    });
    res.json(endpoints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching endpoints", error });
  }
};

exports.createEndpoint = async (req, res) => {
  try {
    const endpointData = { ...req.body, userId: req.user.id };
    const endpoint = await Endpoint.create(endpointData);
    res.status(201).json(endpoint);
  } catch (error) {
    res.status(500).json({ message: "Error creating endpoint", error });
  }
};

exports.getEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findByPk(req.params.id);

    if (!endpoint || endpoint.userId !== req.user.id) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    res.json(endpoint);
  } catch (error) {
    res.status(500).json({ message: "Error fetching endpoint", error });
  }
};

exports.updateEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findByPk(req.params.id);

    if (!endpoint || endpoint.userId !== req.user.id) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    await endpoint.update(req.body);
    res.json(endpoint);
  } catch (error) {
    res.status(500).json({ message: "Error updating endpoint", error });
  }
};

exports.deleteEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findByPk(req.params.id);

    if (!endpoint || endpoint.userId !== req.user.id) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    await endpoint.destroy();
    res.json({ message: "Endpoint deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting endpoint", error });
  }
};
