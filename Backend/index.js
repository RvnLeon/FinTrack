const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenseRoute = require("./routes/expense");

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/expenses", expenseRoute);

// DB CONNECTION
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB CONNECTION IS SUCCESSFUL");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on http://localhost:${process.env.PORT}`);
});
