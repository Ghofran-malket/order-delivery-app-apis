// index.js
const express = require('express');
const app = express();
const itemsRoutes = require('./routes/items');

app.use(express.json()); // To parse JSON bodies
app.use('/api/items', itemsRoutes); // Use item routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
