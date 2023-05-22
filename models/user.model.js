const mogoose = require("mongoose");
const userSchema = new mogoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
    },
    balance: {
      type: Number,
      required: [true, "Balance is required."],
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mogoose.model("users", userSchema);
module.exports = userModel;
