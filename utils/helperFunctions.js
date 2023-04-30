// utils/helperFunctions.js

const crypto = require("crypto");

// ...

function generateUserApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

async function storeUserApiKey(userId, models) {
  const apiKey = generateUserApiKey();
  const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");

  await models.UserApiKey.create({
    user_id: userId,
    hashed_key: hashedKey,
  });

  return apiKey;
}

module.exports = {
  // ...
  generateUserApiKey,
  storeUserApiKey,
};
