const Product = require("../models/product");
const User = require("../models/user");
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
const updateProduct = async (req, res, next) => {
  try {
    console.log("check req: ", req.body);
    const { _id, category, long_desc, name, short_desc } = req.body;
    if (!req.body) {
      res.status(400).json({ message: "Product id is required" });
      return;
    }
    const findProduct = await Product.findById(_id);
    if (!findProduct) {
      res.status(401).json({ message: "Not found product" });
      return;
    }
    findProduct.category = category;
    findProduct.name = name;
    findProduct.long_desc = long_desc;
    findProduct.short_desc = short_desc;
    await findProduct.save();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log("server error: ", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
const addNewProduct = async (req, res, next) => {
  try {
    console.log("check req: ", req.body);
    const {
      userId,
      category,
      long_desc,
      name,
      short_desc,
      price,
      quantity,
      images,
    } = req.body;
    if (!req.body) {
      res.status(400).json({ message: "Product id is required" });
      return;
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "not found user" });
      return;
    } else {
      if (!user.isAdmin) {
        res
          .status(400)
          .json({ message: "your account do not allow adding new products" });
      }
    }

    // const product = new Product({
    //   category: category,
    //   name: name,
    //   long_desc: long_desc,
    //   short_desc: short_desc,
    //   price: price,
    //   quantity: quantity,
    //   images: images,
    // });
    // await product.save();
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
  updateProduct,
  addNewProduct,
};
