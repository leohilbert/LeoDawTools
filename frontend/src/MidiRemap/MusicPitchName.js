// Chromatic melodic scale
const CHROMATIC = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

function fromMidi(midi) {
  const name = CHROMATIC[midi % 12];
  const oct = Math.floor(midi / 12) - 1;
  return name + oct;
}
module.exports.fromMidi = fromMidi;
