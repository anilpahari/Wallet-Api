const express = require("express");
const auth = require("../../middleware/auth");
const addExpenses = require("./controllers/addExpenses");
const expensesRoute = express.Router();

expensesRoute.use(auth);
expensesRoute.post("/add", addExpenses);
module.exports = expensesRoute;
