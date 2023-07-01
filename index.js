const express = require("express");
const app = express();
let cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./model/expense.model");
const expenseRoutes = require("./routes/expenseRouter");
const userRoutes = require("./routes/userRoutes");

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

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
});
