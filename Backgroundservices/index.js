const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const expenseEmail = require("./EmailService/Expense");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((err) => {
    console.error(err);
  });

const schedule = () => {
  cron.schedule("* * * * * *", () => {
    expenseEmail();
  });
};

schedule();

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on http://localhost:${process.env.PORT}`);
});
