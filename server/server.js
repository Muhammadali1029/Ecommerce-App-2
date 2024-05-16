const express = require('express');
const connectToMongoDB = require('./dbConnect/dbConnection.js');
const app = express();
const routes = require("./routes/routes.js");
const cors = require("cors");

// Middleware
app.use(cors()); // Use cors middleware first
app.use(express.json()); // Body parsing middleware
app.use("/", routes); // Define routes

// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start server
const PORT = process.env.PORT || 3000; // Use dynamic port or fallback to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
