// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require("http");
const socketHandler = require("./socket/socketHandler");

dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});
socketHandler(io);
connectDB();

const userRoutes = require('./routes/userRoutes');
const genieRoutes = require('./routes/genieRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const chatRoutes = require('./routes/chatRoutes');
const offerRoutes = require('./routes/offerRoutes');

app.use(express.json()); // To parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/genie', genieRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/offers', offerRoutes);
server.listen(PORT, () => console.log(`Server running on port http://0.0.0.0:3000`));
