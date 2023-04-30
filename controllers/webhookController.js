const { User, ApiKey } = require("../models");
const crypto = require("crypto");

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const ALGORITHM = "aes-256-gcm";

const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const hashApiKey = (apiKey) => {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
};

function encryptApiKey(apiKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(apiKey, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

const handleClerkWebhook = async (req, res) => {
  const eventType = req.body.type;
  const eventData = req.body.data;

  if (eventType === "user.created") {
    try {
      const user = await User.create({
        clerkUserId: eventData.id,
        email: eventData.email_addresses[0].email_address,
      });

      console.log("User created:", user);

      const apiKey = generateApiKey();
      const hashedApiKey = hashApiKey(apiKey);
      const encryptedApiKey = encryptApiKey(apiKey);

      const userApiKey = await ApiKey.create({
        clerkUserId: eventData.id,
        hashed_key: hashedApiKey,
        encrypted_key: encryptedApiKey,
      });

      res.status(200).send("User and API key created");
    } catch (error) {
      console.error("Error creating user and API key:", error);
      res.status(500).send("Error creating user and API key");
    }
  } else {
    res.status(200).send("Unhandled event type");
  }
};

module.exports = {
  handleClerkWebhook,
};
