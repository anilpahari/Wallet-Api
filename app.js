const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./modules/users/user.route");
const incomeRoute = require("./modules/income/income.route");
const expensesRoute = require("./modules/expenses/expenses.route");
require("dotenv").config();
const app = express();
app.use(express.json());
require("./models/user.model");
require("./models/transaction.model");
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connection to mongoo is sucess..");
  })
  .catch((e) => {
    console.log("Connection failed", e);
  });

app.use("/users", userRoute);
app.use("/income", incomeRoute);
app.use("/expenses", expensesRoute);
app.listen(8000, () => {
  console.log("Server started suceessfully.....");
});
