const { Router, response } = require("express");
const Inmate = require("../models/Inmate");
const router = Router();

//Create record in MongoDB Atlas using mongoose
router.post("/", (request, response) => {
  const newInmate = new Inmate(request.body);
  newInmate.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Inmate.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/:id", (request, response) => {
  Inmate.findById(request.params.id, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/filterInmateId/:inmateid", (request, response) => {
  Inmate.find({ inmateid: request.params.inmateid }, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/filterFullName/:fullname", (request, response) => {
  Inmate.find({ fullname: request.params.fullname }, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Inmate.find(
    {
      $search: {
        autocomplete: {
          query: request.params.payload,
          path: "title",
          fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 256 }
        }
      }
    },
    { $limit: 10 },
    { $project: { _id: 0, title: 1 } },
    (error, record) => {
      if (error) return response.status(500).json(error);
      return response.json(record);
    }
  );
});

module.exports = router;
