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
          } else {
            // No mapped note-equivalent.
            // Removing this event would cause an timing-offset for all following events
            // For now we will just set it to the highest possible note (127) and hope nobody uses it.. ^^'
            event.noteNumber = 127;
          }
          return event;
        })
        .filter((el) => el != null);
    });
    return midiData;
  }
}

module.exports = MidiRemapService;
