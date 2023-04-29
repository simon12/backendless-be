const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      this.setDataValue("password", hash);
    },
  },
});

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
