const User = require("./User");
const Endpoint = require("./Endpoint");
const ApiKey = require("./ApiKey");
const ExternalApiKey = require("./ExternalApiKey");

User.hasMany(Endpoint, { foreignKey: "UserId", onDelete: "CASCADE" });
Endpoint.belongsTo(User, { foreignKey: "UserId" });

User.hasOne(ApiKey, { foreignKey: "user_id", onDelete: "CASCADE" });
ApiKey.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(ExternalApiKey, { foreignKey: "UserId", onDelete: "CASCADE" });
ExternalApiKey.belongsTo(User, { foreignKey: "UserId" });

module.exports = { User, Endpoint, ApiKey, ExternalApiKey };
