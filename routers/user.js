const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const validator = require("express-validator");
const User = require("../models/user");

// router.get("/:userId/get-trans", userController.handleUserGetTrans);

router.post(
  "/login",
  [
    validator
      .check("email")
      .isEmail()
      .withMessage("Enter email is invalid, try again"),
  ],
  userController.handleUserLogin
);

// router.post("/create-trans", userController.handleUserCreateTrans);

router.post(
  "/signup",
  [
    validator.check("fullName").isLength({ min: 5, max: 20 }),
    validator
      .check("email")
      .isEmail()
      .withMessage("Enter email is invalid, try again")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email is existed, please try again");
        }
        return true;
      }),
    validator.check("phoneNumber").isLength({ min: 9, max: 12 }).isNumeric(),
  ],
  userController.handleUserSignUp
);

module.exports = router;
