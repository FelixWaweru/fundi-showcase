const express = require("express");
const app = express();

app.get("/api/data", (req, res) => {
    const data = {
        message: "This is a sample JSON response from the API."
    };
    res.json(data);
});

// New Route
app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
    res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎉 Server is live on port:${PORT} 🎉`);
});