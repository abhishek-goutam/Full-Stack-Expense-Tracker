const Sequelize = require("sequelize");

const sequelize = new Sequelize("db_connect", "abhishek", "password", {
  dialect: "mysql",
  host: "localhost",
});


module.exports =sequelize;