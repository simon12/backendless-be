const ApiKey = require("../models/ApiKey");

const customAuthMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "No API key provided" });
  }

  try {
    const apikeyRecord = await ApiKey.findOne({ where: { key: apiKey } });
    if (!apikeyRecord) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    req.user = apikeyRecord.UserId;
    next();
  } catch (error) {
    console.error("Error in customAuth middleware:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = customAuthMiddleware;
