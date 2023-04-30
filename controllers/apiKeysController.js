const { User, ApiKey } = require("../models");
const crypto = require("crypto");

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function decryptApiKey(encryptedApiKey) {
  const [iv, encrypted] = encryptedApiKey.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_KEY,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(Buffer.from(encrypted, "hex"), "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

exports.getApiKey = async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({ where: { user_id: req.user.id } });

    if (!apiKey) {
      return res.status(404).json({ message: "API key not found" });
    }

    const plaintextApiKey = decryptApiKey(apiKey.encrypted_key);
    res.json({ api_key: plaintextApiKey });
  } catch (error) {
    res.status(500).json({ message: "Error fetching API key", error });
    console.log(error);
  }
};

exports.createApiKey = async (req, res) => {
  try {
    console.log(req.body);
    const newApiKey = { userId: req.body.userid };
    const apiKey = await ApiKey.create(newApiKey);
    res.status(201).json(apiKey);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating API key", error });
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
