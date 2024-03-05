const request = require("supertest");
const express = require("express");

const app = express();

app.get("/api/data", (req, res) => {
  const data = {
    message: "This is a sample JSON response from the API."
  };
  res.json(data);
});

describe("GET /api/data", () => {
  it("responds with JSON data", async () => {
    const response = await request(app).get("/api/data");
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("This is a sample JSON response from the API.");
  });
});