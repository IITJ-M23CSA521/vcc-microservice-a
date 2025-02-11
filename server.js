const axios = require("axios");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Microservice A  ");
});

app.get("/call-b", async (req, res) => {
  try {
    const { data } = await axios.get("http://192.168.0.146:6000");

    res.send({
      success: true,
      message: "Successfully received response from Microservice B",
      data,
    });
  } catch (error) {
    console.error("Error calling Microservice B:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to connect to Microservice B",
      error: error.message,
    });
  }
});

app.listen(5001, () => {
  console.log("Microservice A running on port 5001");
});
