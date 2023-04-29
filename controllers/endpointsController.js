const { User, Endpoint } = require("../models");
const vm = require("vm");

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
    const endpointData = { ...req.body, userId: req.user.id, testVersion: "" };
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

exports.saveTestCase = async (req, res) => {
  const { id } = req.params;
  const { testCase } = req.body;

  const endpoint = await Endpoint.findOne({
    where: { id, userId: req.user.id },
  });

  if (!endpoint) {
    return res.status(404).send("Endpoint not found.");
  }

  endpoint.testVersion = testCase;
  await endpoint.save();

  res.status(200).send("Test case saved.");
};

exports.runTestCase = async (req, res) => {
  const { id } = req.params;
  const { payload } = req.body;

  const endpoint = await Endpoint.findOne({
    where: { id, userId: req.user.id },
  });

  if (!endpoint) {
    return res.status(404).send("Endpoint not found.");
  }

  // Make sure there's a test case
  if (!endpoint.testVersion) {
    return res.status(400).send("No test case defined.");
  }

  try {
    const script = new vm.Script(endpoint.testVersion);
    const context = vm.createContext({ payload });
    script.runInContext(context);
    res.status(200).json(context.result);
  } catch (error) {
    res.status(500).send("Error running test case: " + error.message);
  }
};
