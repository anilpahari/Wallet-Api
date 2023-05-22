const mogoose = require("mongoose");
const transactionSchema = new mogoose.Schema(
  {
    income: {
      type: Number,
      required: [true, "Income is required"],
    },
    remarks: {
      type: String,
      required: "Remarsk is required",
    },
    user_id: {
      type: mogoose.Schema.Types.ObjectId,
      ref: "users",
      required: "User_id is required...",
    },
    transaction_type: {
      type: String,
      enum: ["income", "expenses"],
      required: [true, "Transaction type is required.."],
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mogoose.model("transaction", transactionSchema);
module.exports = userModel;
