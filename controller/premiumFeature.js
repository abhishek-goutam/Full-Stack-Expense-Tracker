const User = require("../model/users.model");
const Expense = require("../model/expense.model");
const sequelize = require("../config/database");

const getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userAggregatedExpenses = {};

    console.log("expenses",expenses)

    expenses.forEach((expense) => {
      if (userAggregatedExpenses[expense.userId]) {
        userAggregatedExpenses[expense.userId] += expense.expenseAmount;
      } else {
        userAggregatedExpenses[expense.userId] = expense.expenseAmount;
      }
    });
     
    console.log("userAggregatedExpenses",userAggregatedExpenses)
    var userLeaderBoardDetails = [];

    users.forEach((user) => {
      userLeaderBoardDetails.push({
        name: user.name,
        total_cost: userAggregatedExpenses[user.id],
      });
    });
    res.status(200).json(userLeaderBoardDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUserLeaderBoard,
};
