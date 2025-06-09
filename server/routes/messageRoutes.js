const express = require("express");
const {
  newMessage,
  getMessagesUser,
} = require("../controllers/messageControllers");
const router = express.Router();

router.post("/", newMessage);
router.get("/:user1/:user2", getMessagesUser);

module.exports = router;
