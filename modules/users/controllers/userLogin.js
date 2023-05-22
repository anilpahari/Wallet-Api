const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const users = mongoose.model("users");
  const { email, password } = req.body;
  try {
    if (!email) throw "Please enter email";
    if (!password) throw "Please enter password";
    const userGet = await users.findOne({
      email: email,
    });
    //console.log(userGet);
    if (!userGet) throw "Email doesnot match";
    const matched = await bcrypt.compare(password, userGet.password);
    if (!matched) throw "Password doesnot match";
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e,
    });
    return;
  }
  const userGetForAcesstoken = await users.findOne({
    email: email,
  });
  const acessToken = jwt.sign(
    {
      _id: userGetForAcesstoken._id,
      email: userGetForAcesstoken.email,
      name: userGetForAcesstoken.name,
    },
    process.env.jwt_key,
    {
      expiresIn: "90 days",
    }
  );
  res.status(200).json({
    status: "Logged in....",
    acessToken,
  });
};
module.exports = userLogin;
