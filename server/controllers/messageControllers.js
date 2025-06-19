const Message = require("../models/Message");

// @desc POST new message
// @route /api/messages
const newMessage = async (req, res, next) => {
  const { sender, receiver, text } = req.body;
  const message = new Message({ sender, receiver, text });
  await message.save();
  res.status(201).json(message);
};

// @desc GET messages between users
// @route /api/:user1/:user2
const getMessagesUser = async (req, res, next) => {
  const { user1, user2 } = req.params;
  const message = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ createdAt: 1 });
  res.status(200).json(message);
};

module.exports = { newMessage, getMessagesUser };
