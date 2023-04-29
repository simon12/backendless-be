const axios = require("axios");

async function generateResponse(apiKey, prompt, maxTokens, temperature) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
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
