const express = require("express");
let midiParser = require("midi-parser-js");
let fs = require("fs");
let xml2js = require("xml2js");

const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.get("/remap", function (req, res, next) {
    fs.readFile(
        "D:\\GoogleDrive\\LeoEP\\LeoEP Share\\Ryan\\Demo EP Part I\\midi\\4_quark_new.midi",
        "base64",
        function (err, data) {
            const midiArray = midiParser.parse(data);
            console.log(midiArray);
            res.send({hi: "hooooo"});
        }
    );
});

router.post("/pitchList", upload.single('file'), function (req, res, next) {
    xml2js.parseString(req.file.buffer.toString(), function (err, result) {
        const pitchNames = result['Music.PitchNameList']['Music.PitchName'];
        const resBody = pitchNames.map(entry => {
            return   {
                pitch: entry['$'].pitch,
                name: entry['$'].name,
            }
        })
        res.send(resBody);
    });
});

module.exports = router;
