const User = require("../model/users.model");
const Expense = require("../model/expense.model");
const sequelize = require("../config/database");

const getUserLeaderBoard = async (req, res) => {
  try {
    const leaderboardOfUsers = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("sum", sequelize.col("expenseDetails.expenseAmount")),
          "total_cost",
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["users.id"],
      order: [[sequelize.col("total_cost"),"DESC"]],
    });

    res.status(200).json(leaderboardOfUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUserLeaderBoard,
};
