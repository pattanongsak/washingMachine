const express = require("express");
const app = express();

app.use(express.json());

// Route Import
const washingMachine = require("./routes/washingMachine");

app.use("/api/v1", washingMachine);

module.exports = app;
