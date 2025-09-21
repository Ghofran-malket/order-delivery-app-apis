// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // To parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
