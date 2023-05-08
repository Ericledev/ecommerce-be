const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  isCounselor: {
    type: Boolean,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
