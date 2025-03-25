const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
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
    console.log("running a task every minute");
  });
};

schedule();

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on http://localhost:${process.env.PORT}`);
});
