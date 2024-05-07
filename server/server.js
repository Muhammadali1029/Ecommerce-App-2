// server.js
const express = require('express');
const connectToMongoDB = require('./dbConnect/dbConnection.js');
const app = express();
const routes = require("./routes/routes.js");
const cors = require("cors"); // Import cors


// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json());
app.use("/", routes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});

//test

