const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    //Join room (genie and customer)
    socket.on("join_room", (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    //Send msg
    socket.on("send_message", async (data) => {
      const { chatId, senderId, receiverId, text, type } = data;

      try {
        //Save message in MongoDB
        const  updatedChat = await Chat.findOneAndUpdate(
          { chatId: chatId },
          { $push: { messages: { senderId: senderId, receiverId: receiverId, text: text, type: type }} },
          { new: true, upsert: true }
        )
        const newMessage = updatedChat.messages[updatedChat.messages.length - 1];
        console.log(newMessage);
        // 2. Emit message to the chat room
        io.to(chatId).emit("receive_message", newMessage);

      } catch (err) {
        console.log("Save message error:", err.message);
      }
    });

    //disconnect
    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};
