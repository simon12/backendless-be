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
