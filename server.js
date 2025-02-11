const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Microservice A");
});

app.get("/call-b", async (req, res) => {
  try {
    const response = await fetch("http://192.168.1.102:6000");
    const data = await response.text();
    res.send(`Response from Microservice B: ${data}`);
  } catch (error) {
    res.status(500).send("Error connecting to Microservice B");
  }
});

app.listen(5001, () => {
  console.log("Microservice A running on port 5001");
});
