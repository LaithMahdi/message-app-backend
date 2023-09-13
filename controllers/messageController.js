const Message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const message = await Message.create({
      content,
      senderId: req.user.userId, // Assuming you have implemented user authentication
      receiverId,
    });

    // Emit a message event using Socket.io to notify the receiver
    io.to(`user_${receiverId}`).emit('new_message', message);

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Retrieve messages for a user
exports.getMessagesForUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have implemented user authentication
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
