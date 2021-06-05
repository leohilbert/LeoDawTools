const express = require("express");
let midiParser = require("midi-parser-js");
let xml2js = require("xml2js");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/remap", upload.single("midi"), function (req, res, next) {
  let midiString = req.file.buffer.toString("base64");
  // noinspection JSCheckFunctionSignatures
  const midiArray = midiParser.parse(midiString);
  console.log(midiArray);
  res.send({ hi: "hooooo" });
});

router.post("/pitchList", upload.single("file"), function (req, res, next) {
  xml2js.parseString(req.file.buffer.toString(), function (err, result) {
    const pitchNames = result["Music.PitchNameList"]["Music.PitchName"];
    const pitchList = pitchNames.map((entry) => {
      return {
        pitch: entry["$"].pitch,
        name: entry["$"].name,
      };
    });
    res.send({
      name: req.file.originalname.replace(/\.[^/.]+$/, ""),
      content: pitchList,
    });
  });
});

module.exports = router;
