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

module.exports = {
  getAllProducts,
};
