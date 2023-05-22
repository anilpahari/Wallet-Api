const mongoose = require("mongoose");
const addIncome = async (req, res) => {
  const { income, remarks } = req.body;
  const User = mongoose.model("users");
  const Transaction = mongoose.model("transaction");
  try {
    if (!income) throw "Amount cannot be empty";
    if (income <= 1) throw "Amount must be grater than 0...";
    if (!remarks) throw "Please give some remarks";
    if (remarks.length < 2)
      throw "Remarks must be atleast two character long..";
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e,
    });
    return;
  }

  ////
  try {
    ///transactions history...
    await Transaction.create({
      income: income,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "income",
    });
    const updateAmount = await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: income,
        },
      },
      {
        runValidators: true,
      }
    );
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    status: "Income is updated:",
  });
};
module.exports = addIncome;
