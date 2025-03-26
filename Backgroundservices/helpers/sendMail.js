const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const expenseEmail = require("../EmailService/Expense");
dotenv.config();

const createTransporter = (config) => {
  const transporter = nodeMailer.createTransporter(config);
  return transporter;
};

let configuration = {
  servie: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
};

const sendMail = async (messageOption) => {
  const transporter = await createTransporter(cofiguration);
  await transporter.verify();
  await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info.response);
  });
};

module.exports = sendMail;
