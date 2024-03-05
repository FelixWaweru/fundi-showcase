const express = require("express");

const app = express();

app.get("/api/data", (req, res) => {
    const data = {
      message: "This is a sample JSON response from the API."
    };
    res.json(data);
  });

  const PORT = 3000;
  app.listen(PORT, () => {
  console.log(`🎉 Server is live on port:${PORT} 🎉`);
});