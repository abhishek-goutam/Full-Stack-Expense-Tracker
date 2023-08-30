const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ForgotPasswordRequest = sequelize.define("forgetPasswordRequest", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  userId: {},
  isActive: Sequelize.BOOLEAN,
});

module.exports = { ForgotPasswordRequest };
