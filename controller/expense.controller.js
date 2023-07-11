const Expense = require("../model/expense.model");
const User = require("../model/users.model");
const path = require("path");

module.exports = {
  getAllExpense: async (req, res) => {
    try {
      const expenses = await Expense.findAll({where:{userId:req.user.id}});

      return res.status(200).json({ expenses:expenses, success: true });
    } catch (error) {
      return res.status(500).json({ error: error, success: false });
    }
  },

  getExpense: async (req, res) => {
    try {
      const expenseData = await Expense.findByPk(req.params.id);
      console.log(expenseData);
      res.send(expenseData);
    } catch (error) {
      console.log(error);
    }
  },

  addExpense: async (req, res) => {
    // **************First Method*********
    // Expenses.build(req.body)
    //   .save()
    //   .then((data) => {
    //     res.send(data);
    //   })
    //   .catch((err) => res.send(err));

    // ***********Second Method ***********

    try {
      const { expenseAmount, description, category } = req.body;

      if (expenseAmount == undefined || expenseAmount.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Parameters missing" });
      }
      const result = await Expense.create({
        expenseAmount,
        description,
        category,
      });
      return res.status(201).json({ result, success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const data = await Expense.destroy({ where: { id: req.params.id } });
      console.log("Deleted", data);
      res.send("data");
    } catch (error) {
      console.log(error);
    }
  },
};
