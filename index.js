// Import required modules
const express = require("express");

// Create an Express application
const app = express();

// Define a route for the "/api/data" endpoint
app.get("/api/data", (req, res) => {
  // Sample JSON data
  const data = {
    message: "This is a sample JSON response from the API.",
    timestamp: new Date(),
  };

  // Send the JSON response
  res.json(data);
});

// Start the Express server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
