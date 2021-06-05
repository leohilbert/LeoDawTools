const express = require("express");
let xml2js = require("xml2js");
const stream = require("stream");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const midiFile = require("midi-file");
const MidiRemapService = require("../services/MidiRemapService");

router.get("/", function (req, res) {
  res.send({
    hi: "ho",
  });
});

router.post("/remap", upload.single("midi"), function (req, res) {
  const source = midiFile.parseMidi(req.file.buffer);
  let remapData = JSON.parse(req.body["remapData"]);

  const remapped = new MidiRemapService().remap(source, remapData);

  const remappedMidi = midiFile.writeMidi(remapped);

  const readStream = new stream.PassThrough();
  readStream.end(Buffer.from(remappedMidi));

  let fileName = req.file.originalname.replace(/\.[^/.]+$/, "");
  res.set(
    "Content-disposition",
    `attachment; filename=${fileName}-remapped.midi`
  );
  res.set("Content-Type", "audio/midi");
  readStream.pipe(res);
});

router.post("/pitchList", upload.single("file"), function (req, res) {
  xml2js.parseString(req.file.buffer.toString(), function (err, result) {
    const pitchNames = result["Music.PitchNameList"]["Music.PitchName"];
    const pitchList = pitchNames.map((entry) => {
      return {
        pitch: Number(entry["$"].pitch),
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
