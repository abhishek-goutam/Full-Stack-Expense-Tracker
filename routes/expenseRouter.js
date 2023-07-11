const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense.controller");
const userAuthenticate = require("../middleware/auth");

router.get(
  "/getexpenses",
  userAuthenticate.authenticate,
  expenseController.getAllExpense
);
router.get("/expense/:id", expenseController.getExpense);

router.post("/addexpense",userAuthenticate.authenticate, expenseController.addExpense);

router.put("/expense/:id", expenseController.addExpense);

router.delete("/deleteexpense/:id",userAuthenticate.authenticate, expenseController.deleteExpense);

module.exports = router;
