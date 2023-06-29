const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense.controller");
const userController = require("../controller/user.controller");

router.get("/expense", expenseController.getAllExpense);

router.get("/expense/:id", expenseController.getExpense);

router.post("/expense", expenseController.postExpense);

router.put("/expense/:id", expenseController.postExpense);

router.delete("/expense/:id", expenseController.deleteExpense);

router.post("/user/signUp", userController.signUp);

router.get("/users", userController.getAllUsers);

router.post("/user/login", userController.login);

module.exports = router;
