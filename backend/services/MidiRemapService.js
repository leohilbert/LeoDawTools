class MidiRemapService {
  remap(midiData, remapData) {
    midiData["tracks"] = midiData["tracks"].map((track) => {
      return track
        .map((event) => {
          if (!event.noteNumber) {
            // Not a note-event. Just leave it as it is.
            return event;
          }
          const remappedNote = remapData[event.noteNumber];
          if (Number(remappedNote)) {
            event.noteNumber = Number(remappedNote);
            return event;
          }

          // No note-equivalent. Remove this event.
          return null;
        })
        .filter((el) => el != null);
    });
    return midiData;
  }
}

module.exports = MidiRemapService;
