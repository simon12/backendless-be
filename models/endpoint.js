const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

class Endpoint extends Model {}

Endpoint.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    promptTemplate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    regexRules: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    typeRules: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    jsonResponseFormat: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Endpoint",
  }
);

module.exports = Endpoint;
