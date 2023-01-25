const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const User = require("../models/user.model");
const Archive = require("../models/archives.model");

require("dotenv").config();
const SECURITY_KEY = process.env.SECURITY_KEY;

//to fetch all archived pairs
router.post("/get_all_archives", jsonParser, (req, res) => {
  Archive.find({})
    .then((archives) => {
      res.json(archives);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

//the route adds archive pair if not present or else deletes it.
router.post("/add_archive", jsonParser, (req, res) => {
  const { me, them } = req.body;
  //find the archive pair
  Archive.findOne({ me, them }, (err, archive) => {
    if (archive) { //if present, delete it
      Archive.deleteOne({ me, them }, (err, archive) => {
        if (err) res.status(500).json("Error has occured. Please refresh page");
        else {
          res.json({ Message: "Deleted" });
        }
      });
    } else { //else add a new pair
      const newArchive = new Archive({ me, them });
      newArchive
        .save()
        .then(() => {
          res.json({ Message: "Success" });
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// router.post("/remove_archive", jsonParser, (req, res) => {
//   const { me, them } = req.body;
//   Archive.deleteOne({ me, them }, (err, archive) => {
//     if (err) res.status(500).json("Error has occured. Please refresh page");
//     else {
//       console.log("Archive deleted");
//     }
//   });
// });

module.exports = router;
