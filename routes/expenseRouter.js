const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense.controller");

router.get("/getexpenses", expenseController.getAllExpense);

router.get("/expense/:id", expenseController.getExpense);

router.post("/addexpense", expenseController.addExpense);

router.put("/expense/:id", expenseController.addExpense);

router.delete("/deleteexpense/:id", expenseController.deleteExpense);

module.exports = router;
