const express = require("express");
const app = express();
let cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./model/expense.model");
const apiRoutes = require("./routes/expenseRouter");
const PORT = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname,'css')));
app.use(cors());
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
