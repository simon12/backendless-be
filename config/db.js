const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "sqlite", // Replace with the appropriate dialect for your SQL database
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  connect,
};
