const express = require("express");
const app = express();
let cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./model/expense.model");
const apiRoutes = require("./routes/expenseRouter");

app.use(cors());
const PORT = 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use("/api", apiRoutes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
});
