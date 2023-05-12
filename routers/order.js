const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const auth = require("../middleware/auth");

router.post("/add-new-order", orderController.addNewOrder);

// router.get("/all-trans", auth, transController.getAllTran);
// router.post("/signup", adminController.handleAdminSignUp);

module.exports = router;
