import React from "react";
import MidiRemapView from "./MidiRemapView";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  notes: {
    "source-540": {
      pitch: 540,
      target: false,
      name: "SourceSnare",
    },
    "source-550": {
      pitch: 550,
      target: false,
      name: "SourceKick",
    },
    "target-640": {
      pitch: 640,
      target: true,
      name: "TargetSnare",
    },
  },
  sourceColumn: ["source-540", "source-550"],
  targetColumn: ["target-640"],
};

class MidiRemap extends React.Component {
  state = initialData;

  onDragEnd = (result) => {};

  render() {
    const sourceNotes = this.state.sourceColumn.map(
      (noteId) => this.state.notes[noteId]
    );
    const targetNotes = this.state.targetColumn.map(
      (noteId) => this.state.notes[noteId]
    );
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <MidiRemapView sourceNotes={sourceNotes} targetNotes={targetNotes} />
        </React.Fragment>
      </DragDropContext>
    );
  }
}

export default MidiRemap;
