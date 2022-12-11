const resetPassword = (otp) => {
  return {
    subject: "Reset password",
    message:
      `Dear User,\n` +
      `${otp} is your otp for Reset Password.Please Enter the OTP to proceed.\n` +
      `Regards\n` +
      `Zevoi`,
  };
};

module.exports = { resetPassword };
