const { Router, response } = require("express");
const Upload = require("../models/Upload");
const router = Router();

//Create record in MongoDB Atlas using mongoose
router.post("/", (request, response) => {
  const newUpload = new Upload(request.body);
  newUpload.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

//Read all uploads from MongoDB Atlas
router.get("/", (request, response) => {
  Upload.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
