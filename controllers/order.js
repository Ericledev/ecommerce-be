const { Decimal128 } = require("mongodb");
const Order = require("../models/order");
const { parse } = require("dotenv");
const io = require("../socket");
// const User = require("../models/user");

const addNewOrder = async (req, res) => {
  console.log("check req: ", req.body);
  console.log("check cart: ", req.body.cart.listCart);
  try {
    const { user_id, products } = req.body;
    // check input
    if (
      user_id.trim() === "" ||
      products.trim() === "" ||
      products.length === 0
    ) {
      res.status(400).json({ message: "All input is not empty" });
      return;
    }
    const order = new Order({
      user_id: req.body.user.userId,
      products: products,
    });
    await order.save();
    // emit to client
    // io.getIO().emit("posts_quantity_product",{
    //   action:"updated",product:product
    // })
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
// const getLatestTran = async (req, res) => {
//   try {
//     const trans = await Transaction.find()
//       .populate([
//         { path: "user", select: "fullName" },
//         { path: "hotel", select: "name" },
//       ])
//       .sort({ updatedAt: "desc" })
//       .limit(8);
//     const numOfUsers = (await User.find({ isAdmin: false })).length;
//     const transaction = await Transaction.find();
//     const numOfTrans = transaction.length;
//     const earning = transaction.reduce((total, item) => total + item.price, 0);
//     const balance = (earning / 12).toFixed(2);
//     //console.log("CHECK COUNT USER: ", balance.toFixed(2));

//     res.status(200).json({
//       message: "ok",
//       trans: trans,
//       numOfUsers,
//       numOfTrans,
//       earning,
//       balance,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getAllTran = async (req, res) => {
//   try {
//     const trans = await Transaction.find().populate([
//       { path: "user", select: "fullName" },
//       { path: "hotel", select: "name" },
//     ]);

//     res.status(200).json({
//       message: "ok",
//       trans: trans,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
module.exports = { addNewOrder };
