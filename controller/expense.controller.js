const sequelize = require("../config/database");
const Expense = require("../model/expense.model");
const UserServices = require("../services/userservices");
const S3Services = require("../services/S3services");
const Users = require('../model/users.model')

module.exports = {
//   getAllExpense: async (req, res) => {
//     try {
    
//       const page = req.query.page ? parseInt(req.query.page) : 1;
//       const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
//       const expenses = await Expense.findAll({
//         where: { userId: req.user.id },
//         limit: pageSize,
//       });
// console.log("Expense Count",expenses)
//       return res.status(200).json({
//         expenses: expenses,
//         totalExpenses: expenses.count,
//         success: true,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         error: error,
//         success: false,
//       });
//     }
//   },
getAllExpense: async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    
    const offset = (page - 1) * pageSize;

    const expenses = await Expense.findAndCountAll({
      where: { userId: req.user.id },
      limit: pageSize,
      offset: offset,
    });

    console.log("Expense Count", expenses.count);

    return res.status(200).json({
      expenses: expenses.rows,
      totalExpenses: expenses.count,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
},

  downloadExpense: async (req, res) => {
    try {
      const expenses = await UserServices.getExpenses(req);
      console.log(expenses);
      const stringifiedExpenses = JSON.stringify(expenses);
      const userId = req.user.id;

      const fileName = `Expense${userId}/${new Date()}.txt`;
      const fileURL = await S3Services.uploadToS3(
        stringifiedExpenses,
        fileName
      );
      res.status(200).json({ fileURL, success: true });
    } catch (error) {
      res.status(500).json({ fileURL: "", success: false, err: err });
    }
  },

  getExpense: async (req, res) => {
    try {
      const expenseData = await Expense.findByPk(req.params.id);
      console.log(expenseData);
      return res.status(200).json({ expenses: expenseData, success: true });
      // res.send(expenseData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, success: false });
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
    // const t = await sequelize.transaction();

    try {
      // console.log("req.user----------", req.body);
      const { expenseAmount, description, category } = req.body;

      if (expenseAmount === undefined || expenseAmount.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Parameters missing" });
      }
      const result = await Expense.create(
        {
          expenseAmount,
          description,
          category,
          userId: req.user.id,
        }
      );

      // console.log("heyyyyyyyyyy---------", result);
      // console.log("TTTTTTTT",t)
      
      const totalExpense =
        Number(req.user.totalExpenses) + Number(expenseAmount);
      await Users.update(
        { totalExpenses: totalExpense },
        {
          where: { id: req.user.id }, // transaction: t
        }
      );
      // console.log("total expense",totalExpense)
      // await t.commit();
      return res.status(200).json({ result, success: true });
    } catch (error) {
      // await t.rollback();
      return res.status(500).json({ success: false, error: error });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const expenseId = req.params.id;
      if (expenseId == undefined || expenseId.length == 0) {
        return res.status(400).json({ success: false });
      }
      const data = await Expense.destroy({
        where: { id: expenseId, userId: req.user.id },
      });

      if (data == 0) {
        return res.status(404).json({
          success: false,
          message: "Expense does not belong to the user",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Delete Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: true, message: "Failed" });
    }
  },
};
