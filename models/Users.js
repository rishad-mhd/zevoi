const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    phone: String,
    place: String,
  },
  { timestamps: true }
);
const Users = mongoose.model("users", UserSchema);
module.exports = { Users };
