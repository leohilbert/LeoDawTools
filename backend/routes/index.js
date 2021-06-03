const express = require("express");
let midiParser = require("midi-parser-js");
let fs = require("fs");

const router = express.Router();

router.get("/remap", function (req, res, next) {
  fs.readFile(
    "D:\\GoogleDrive\\LeoEP\\LeoEP Share\\Ryan\\Demo EP Part I\\midi\\4_quark_new.midi",
    "base64",
    function (err, data) {
      const midiArray = midiParser.parse(data);
      console.log(midiArray);
      res.send({ hi: "hooooo" });
    }
  );
});

router.post("/pitchList", function (req, res, next) {
  res.send([
    {
      pitch: 540,
      name: "Snare",
    },
    {
      pitch: 550,
      name: "Kick",
    },
    {
      pitch: 640,
      name: "Crash",
    },
  ]);
});

module.exports = router;
