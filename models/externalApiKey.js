// this is the  model for the users LLM account API keys

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

class ExternalApiKey extends Model {}

ExternalApiKey.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ExternalApiKey",
  }
);

module.exports = ExternalApiKey;
