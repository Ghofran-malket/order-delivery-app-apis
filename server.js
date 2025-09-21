// index.js
const express = require('express');
const app = express();

app.use(express.json()); // To parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
