const express = require("express");
const app = express();
let cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const Expense = require("./model/expense.model");
const User = require("./model/users.model");
const Order = require("./model/orders");
const expenseRoutes = require("./routes/expenseRouter");
const userRoutes = require("./routes/userRoutes");
const orderRoute = require("./routes/purchaseRouter");
const premium = require("./routes/premiumFeatures");
const resetPasswordRoutes = require("./routes/resetpassword");

const PORT = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "css")));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/expense", expenseRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoute);
app.use("/premium", premium);
app.use("/password", resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
});
