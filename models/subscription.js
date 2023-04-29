const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Subscription = sequelize.define("Subscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  planId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chargebeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = Subscription;
