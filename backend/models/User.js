const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: {
      type: [Object],
      required: false,
    },
    orderList: {
      type: [Object],
      required: false,
    },
    personalData: {
      name: String,
      phone: String,
      city: String,
      street: String,
      house: String,
      flat: String,
      comment: String,
      cashPay: Boolean,
      onlinePay: Boolean,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
