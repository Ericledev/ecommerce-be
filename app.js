require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

// Declare routers
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const verifyRouter = require("./routers/verifyExpire");

const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;

// create app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Assign routers
app.use(verifyRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
// app.use("/admin", adminRouter);

mongoose.connect(URL).then(() => {
  app.listen(PORT, () => {
    console.log("Server runing at port: ", PORT);
  });
});
