const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserApiKey = sequelize.define("UserApiKey", {
  user_id: {
    type: DataTypes.INTEGER,
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
  UserApiKey.belongsTo(models.User, { foreignKey: "user_id" });
};

module.exports = UserApiKey;
