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
    Expenses.build(req.body)
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  },


  deleteExpense: async (req, res) => {
    try {
      const data = await Expenses.destroy({ where: { id: req.params.id } });
      console.log("Deleted",data)
      res.send("data");
    } catch (error) {
      console.log(error);
    }
  },

  signUp : async(req,res)=>{
    try {
      
    } catch (error) {
      
    }
  }
};


