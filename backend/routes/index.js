const express = require("express");
let midiParser = require("midi-parser-js");
let fs = require("fs");

const router = express.Router();

router.get("/", function (req, res, next) {
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

module.exports = router;
