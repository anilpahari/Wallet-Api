const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const incomeRoute = express.Router();

incomeRoute.use(auth);
incomeRoute.post("/add", addIncome);
module.exports = incomeRoute;
