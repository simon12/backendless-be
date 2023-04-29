const axios = require("axios");

async function generateResponse(
  userApiKey,
  model,
  prompt,
  maxTokens,
  temperature
) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/${model}/completions",
      {
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userApiKey}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error in OpenAI service:", error);
    throw error;
  }
}

module.exports = {
  generateResponse,
};
