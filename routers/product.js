const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
// const validator = require("express-validator");
// const Product = require("../models/product");

router.get("/get-all-products", productController.getAllProducts);

// router.post("/create-trans", userController.handleUserCreateTrans);

module.exports = router;
