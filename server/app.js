const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const inmates = require("./routers/inmates")
const uploads = require("./routers/uploads")
const bookings = require("./routers/bookings")
const charges = require("./routers/charges")
const bonds = require("./routers/bonds")
const bodyParser = require("body-parser")

dotenv.config();

//Initialize the Express application for server 1
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
app.use("/charges", charges);
app.use("/bonds", bonds);
app.use(express.static("public"));

//All the s3 things
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFiles, getFileStream } = require('./s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

//get from s3 based on key
app.get('/upload_files/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res)
})

//send to s3
app.post("/upload_files", upload.single("file"), async (req, res) => {
  const file = req.file
  console.log(file)
  console.log(req.body)
  const result = await uploadFiles(file)
  console.log(result)
  res.send({imagePath: `${result.Key}`,
            casenumber: `${req.body.casenumber}`,
            justification: `${req.body.justification}`,
            date: `${req.body.date}`})
  await unlinkFile(file.path)
});

const PORT1 = process.env.API_PORT || 4040;
// we use || to provide a default value
// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT1, () => console.log(`Listening on port ${PORT1}`));
