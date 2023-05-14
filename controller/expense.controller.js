const Expenses = require("../model/expense.model");

module.exports = {
  getAllExpense: async (req, res) => {
    try {
      const usersData = await Expenses.findAll();
      res.send(usersData);
    } catch (error) {
      console.log(error);
    }
  },

  getExpense: async (req, res) => {
    try {
      const expenseData = await Expenses.findByPk(req.params.id);
      console.log(expenseData);
      res.send(expenseData);
    } catch (error) {
      console.log(error);
    }
  },

  postExpense: (req, res) => {
    //   console.log("bodyyyyyyyy", req.body);
    Expenses.build(req.body)
      .save()
      .then((data) => {
        console.log("dataaaaaaaa", data);
        res.send(data);
      })
      .catch((err) => res.send(err));
  },

  updateExpense: async (req, res) => {
    try {
      const user = {
        name: req.body.category,
        email: req.body.amountDetail,
        phone: req.body.amount,
      };
      Expenses.update(user, { where: { id: req.params.id } });
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  
  deleteExpense: async (req, res) => {
    try {
      // const deleteId = await Users.findByPk(req.params.id);
      // console.log("deleteeeeeeeee",deleteId);
      const data = await Expenses.destroy({ where: { id: req.params.id } });
      res.send(data, "Deleted");
    } catch (error) {
      console.log(error);
    }
  },
};
