const express = require("express");
var otpGenerator = require("otp-generator");
const moment = require("moment");
const { OTP } = require("../../models/Otp");
const { resetPassword } = require("../../lib/emailTemplates/resetPassword");
const { sendmail } = require("../../lib/sendMail");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */
module.exports = async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
  const expirationTime = moment().add("10", "M");
  await OTP.create({ otp, expirationTime });
  const { message, subject } = resetPassword(otp);
  sendmail({
    from: `<${process.env.EMAIL_ADDRESS}>`,
    to: `${email}`,
    subject,
    text: message,
  })
    .then((response) => {
      res.json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error, message: "Failed to send email" });
    });
};
