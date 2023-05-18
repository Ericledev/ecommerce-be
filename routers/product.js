const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../middleware/auth");
// const validator = require("express-validator");
// const Product = require("../models/product");

router.get("/get-all-products", auth, productController.getAllProducts);
router.post("/update-product", auth, productController.updateProduct);
router.delete("/delete-product", auth, productController.deleteProducts);

// router.post("/create-trans", userController.handleUserCreateTrans);

module.exports = router;
