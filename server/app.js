const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const inmates = require("./routers/inmates");
const uploads = require("./routers/uploads");
const bookings = require("./routers/bookings");
const charges = require("./routers/charges");
const bodyParser = require("body-parser");

dotenv.config();

// Initialize the Express application
const app = express();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo")
);

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

//CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(logging);
app.use(cors);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

app.get("/echo/:input", (request, response) => {
  const message = request.params.input;
  response.status(418).json({ echo: message });
});

app.use("/inmates", inmates);
app.use("/uploads", uploads);
app.use("/bookings", bookings);
app.use("charges", charges);
app.use(express.static("public"));
app.post("/getInmates", (request, response) => {
  let payload = request.body.payload.trim();
  console.log(payload);
});

const PORT = process.env.PORT || 4040; // we use || to provide a default value
// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(4040, () => console.log("Listening on port 4040"));
