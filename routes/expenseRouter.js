const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense.controller");

router.get("/expense", expenseController.getAllExpense);

router.get("/expense/:id", expenseController.getExpense);

router.post("/expense", expenseController.postExpense);

router.put("/expense/:id", expenseController.postExpense);

router.delete("/expense/:id", expenseController.deleteExpense);

router.post("/expense/signUp",expenseController.signUp);

module.exports = router;
