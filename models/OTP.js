const { default: mongoose } = require("mongoose");

const OTPSchema = new mongoose.Schema(
  {
    otp: String,
    expirationTime: Date,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("otp", OTPSchema);
module.exports = { OTP };
