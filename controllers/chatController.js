const Chat = require('../models/chatModel.js');

const getMessages = async (req, res) => {
    try {
        const chat = await Chat.findOne({ chatId: req.params.chatId },
            { messages: 1, _id: 0}
        );

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Sort messages by createdAt (ascending)
        const orderedMessages = chat.messages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        res.json(orderedMessages);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getMessages };
