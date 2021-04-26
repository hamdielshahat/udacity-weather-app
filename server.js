// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
// const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/all", (req, res) => {
  res.send(JSON.stringify(projectData));
  // res.send(projectData);
  projectData = {};
});

app.post("/add", (req, res) => {
  const { date, temp, feelings } = req.body;
  projectData = { date, temp, feelings };
  res.send(JSON.stringify(projectData));
});

// Setup Server
app.listen(3000, () => {
  console.log("starting on port 3000");
});
