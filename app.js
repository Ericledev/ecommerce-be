require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

// Declare routers
const userRouter = require("./routers/user");
const orderRouter = require("./routers/order");
const productRouter = require("./routers/product");
const verifyRouter = require("./routers/verifyExpire");
// const { Socket } = require("socket.io");

const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;

// create app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Assign routers
app.use(verifyRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
// app.use("/admin", adminRouter);

mongoose.connect(URL).then(() => {
  const server = app.listen(PORT, () => {
    console.log("Server runing at port: ", PORT);
  });
  const io = require("./socket").init(server);
  io.on("connection", (socket) => {
    console.log("client connected");
  });
});
