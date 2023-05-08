const User = require("../models/user");
// const Transaction = require("../models/transaction");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const validator = require("express-validator");

const handleUserLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const error = validator.validationResult(req);
    // Validate user input
    if (!(email || password)) {
      res.status(400).send("All input is required");
    }
    if (!error.isEmpty()) {
      res.status(422).json({ message: error.array()[0].msg });
    }
    User.findOne({ email: email })
      .then(async (user) => {
        // check user & pass
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            process.env.TOKEN_KEY, // mysecret, it should be make by romdom function
            { expiresIn: process.env.EXPIRES_IN }
          );
          user.token = token;
          await user.save();
          res.status(200).json({
            message: "ok",
            user: {
              userId: user._id,
              fullName: user.fullName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              address: user.address,
              token: user.token,
            },
          });
        } else {
          res.status(423).json({
            message: "Login fail",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("CHECK Error: ", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const handleUserSignUp = async (req, res, next) => {
  const { fullName, email, password, phoneNumber } = req.body;
  const error = validator.validationResult(req);
  // Validate user input
  if (!(fullName || email || password || phoneNumber)) {
    res.status(400).send("All input is required");
  }
  if (!error.isEmpty()) {
    res.status(422).json({
      message: "Sign up fail",
    });
  }
  //Encrypt user password
  encryptedPassword = await bcrypt.hash(password, 10);
  // create user
  const user = new User({
    email: email,
    password: encryptedPassword,
    fullName: fullName,
    phoneNumber: phoneNumber,
    address: null,
    isAdmin: false,
    isCounselor: false,
    token: null,
  });
  // Create token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      password: encryptedPassword,
    },
    process.env.TOKEN_KEY, // mysecret, it should be make by romdom function
    { expiresIn: process.env.EXPIRES_IN }
  );
  user.token = token;
  user.save();
  res.status(200).json({
    message: "ok",
    exist: false,
  });
};

// const handleUserCreateTrans = async (req, res, next) => {
//   // console.log("CHECK BODY: ", req.body);
//   // res.status(200).json({ message: "ok" });
//   try {
//     const {
//       user: userId,
//       hotel: hotelId,
//       userInfo,
//       room,
//       price,
//       payment,
//       dateStart,
//       dateEnd,
//     } = req.body;
//     // update user's info
//     const user = await User.findById(userId);
//     user.fullName = userInfo.fullName;
//     user.phoneNumber = userInfo.phoneNumber;
//     user.idCard = userInfo.idCard;
//     await user.save();
//     // create transaction
//     const trans = new Transaction({
//       user: userId,
//       hotel: hotelId,
//       room: room,
//       dateStart: new Date(dateStart),
//       dateEnd: new Date(dateEnd),
//       price: price,
//       payment: payment,
//     });
//     await trans.save();
//     res.status(200).json({ message: "ok" });
//   } catch (error) {
//     res.status(403).json({ message: "fail" });
//   }
// };
// const handleUserGetTrans = async (req, res, next) => {
//   try {
//     const trans = await Transaction.find({
//       user: req.params.userId,
//     }).populate("hotel", "name");
//     res.status(200).json({ message: "ok", trans });
//   } catch (error) {
//     res.status(403).json({ message: "fail" });
//   }
// };
module.exports = {
  handleUserLogin,
  handleUserSignUp,
  // handleUserCreateTrans,
  // handleUserGetTrans,
}; //handleUserLogout
