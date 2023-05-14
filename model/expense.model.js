const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Expenses = sequelize.define("expenseDetails", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amountDetail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }

});

module.exports = Expenses;