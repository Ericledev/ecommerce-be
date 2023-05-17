const Product = require("../models/product");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const validator = require("express-validator");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ message: "not found product" });
      return;
    }
    res.status(200).json({ message: "ok", data: products });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
const deleteProducts = async (req, res, next) => {
  try {
    // console.log("check req: ", req.query);
    if (!req.query.productId) {
      res.status(400).json({ message: "Product id is required" });
      return;
    }
    const findProduct = await Product.findById(req.query.productId);
    if (!findProduct) {
      res.status(401).json({ message: "Not found product" });
      return;
    }
    await Product.deleteOne({ _id: req.query.productId });
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log("server error: ", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAllProducts,
  deleteProducts,
};
