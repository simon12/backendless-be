const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserApiKey = sequelize.define("UserApiKey", {
  clerkUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashed_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  encrypted_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserApiKey.associate = function (models) {
  UserApiKey.belongsTo(models.User, { foreignKey: "clerkUserId" });
};

module.exports = UserApiKey;
