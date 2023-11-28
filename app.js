require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware, routes, and other configurations here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
