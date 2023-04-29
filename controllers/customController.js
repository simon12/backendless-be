const Endpoint = require("../models/Endpoint");
const openAIService = require("../services/openAIService");
const { processOutput } = require("../utils/helperFunctions");

const execute = async (req, res) => {
  try {
    const endpoint = await Endpoint.findByPk(req.params.id);
    if (!endpoint) {
      return res.status(404).json({ error: "Endpoint not found" });
    }

    const input = req.body;
    const prompt = endpoint.promptTemplate;
    const completedPrompt = prompt.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      return input[key.trim()] || "";
    });

    const response = await openAIService.generateText(
      completedPrompt,
      endpoint.apiKey
    );

    const output = processOutput(
      response,
      endpoint.regexRules,
      endpoint.typeRules,
      endpoint.jsonResponseFormat
    );

    return res.json(output);
  } catch (error) {
    console.error("Error executing custom endpoint:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  execute,
};
