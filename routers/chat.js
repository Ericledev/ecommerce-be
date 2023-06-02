const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const chatController = require("../controllers/chat");

router.get("/get-all-chat-room", auth, chatController.getChatRoom);

router.post("/conversation", chatController.createChatRoom);

router.post("/add-chat", chatController.addChat);

module.exports = router;
