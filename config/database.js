const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

const urlParts = new URL(databaseUrl);
const sequelizeOptions = {
  dialect: urlParts.protocol.replace(/:$/, ""),
  logging: env !== "production",
};

if (env === "development" && urlParts.protocol === "sqlite:") {
  sequelizeOptions.storage = "./database.sqlite";
} else if (urlParts.protocol === "postgres:") {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  connect,
};
