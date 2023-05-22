const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRegister = async (req, res) => {
  const users = mongoose.model("users");
  const { name, email, password, address, balance } = req.body;
  const encPassword = await bcrypt.hash(password, 10);

  try {
    const userCreate = await users.create({
      name,
      email,
      password: encPassword,
      address,
      balance,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    status: "User register sucessfully...",
  });
};
module.exports = userRegister;
