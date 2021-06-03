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
      assignedNotes: [],
    },
  },
  sourceColumn: ["source-540", "source-550"],
  targetColumn: ["target-640"],
};

class MidiRemap extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialData;
    this.getNoteForId = this.getNoteForId.bind(this);
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newState = { ...this.state };

    if (source.droppableId === "source") {
      newState.sourceColumn.splice(source.index, 1);
    } else {
      // Inside a TargetNote
      let targetNote = newState.notes[source.droppableId];
      targetNote.assignedNotes.splice(source.index, 1);
    }

    if (destination.droppableId === "source") {
      newState.sourceColumn.splice(destination.index, 0, draggableId);
    } else {
      // Inside a TargetNote
      let targetNote = newState.notes[destination.droppableId];
      targetNote.assignedNotes.splice(destination.index, 0, draggableId);
    }
    console.log(newState);
    this.setState(newState);
  };

  getNoteForId(noteId) {
    return this.state.notes[noteId];
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <MidiRemapView
            sourceColumn={this.state.sourceColumn}
            targetColumn={this.state.targetColumn}
            getNoteForId={this.getNoteForId}
          />
        </React.Fragment>
      </DragDropContext>
    );
  }
}

export default MidiRemap;
