const { Sequelize } = require("sequelize");
const option = {
  dialect: process.env.DIALECT,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
};

// Option 1: Passing a connection URI
exports.sequelize = new Sequelize(option);
