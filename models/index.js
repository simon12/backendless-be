const User = require("./User");
const Endpoint = require("./Endpoint");
const ApiKey = require("./ApiKey");
const ExternalApiKey = require("./externalApiKey");

User.hasMany(Endpoint, { foreignKey: "UserId", onDelete: "CASCADE" });
Endpoint.belongsTo(User, { foreignKey: "UserId" });

User.hasOne(ApiKey, { foreignKey: "UserId", onDelete: "CASCADE" });
ApiKey.belongsTo(User, { foreignKey: "UserId" });

User.hasOne(ExternalApiKey, { foreignKey: "UserId", onDelete: "CASCADE" });
ExternalApiKey.belongsTo(User, { foreignKey: "UserId" });

module.exports = { User, Endpoint, ApiKey, ExternalApiKey };
