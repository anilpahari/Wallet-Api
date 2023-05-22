const mongoose = require("mongoose");
const userDashbord = async (req, res) => {
  const User = mongoose.model("users");
  const Transaction = mongoose.model("transaction");
  const getTransaction = await Transaction.find({
    user_id: req.user._id,
  })
    .select("-createdAt")
    .limit(5);
  const usergetData = await User.findOne({
    _id: req.user._id,
  }).select("balance name");
  res.status(200).json({
    data: usergetData,
    transaction: getTransaction,
  });
  console.log(req.user);
};

module.exports = userDashbord;
