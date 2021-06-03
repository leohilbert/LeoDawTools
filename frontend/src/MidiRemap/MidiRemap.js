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
    this.updatePitchList = this.updatePitchList.bind(this);
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

    const newState = JSON.parse(JSON.stringify(this.state));

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
      if (!targetNote) return;
      targetNote.assignedNotes.splice(destination.index, 0, draggableId);
    }
    console.log(newState);
    this.setState(newState);
  };

  getNoteForId(noteId) {
    return this.state.notes[noteId];
  }

  updatePitchList(columnId, pitchList) {
    const newState = JSON.parse(JSON.stringify(this.state));

    const newNotes = [];
    if (columnId === "source") {
      newState.targetColumn.map((noteId) => {
        let note = this.getNoteForId(noteId);
        newNotes.push({
          id: noteId,
          pitch: note.pitch,
          name: note.name,
          target: true,
          assignedNotes: [],
        });
      });
      newState.sourceColumn = [];
      pitchList.map((note) => {
        const noteId = "source-" + note.pitch;
        newState.sourceColumn.push(noteId);
        newNotes.push({
          id: noteId,
          pitch: note.pitch,
          name: note.name,
          target: false,
        });
      });

      newState.notes = newNotes.reduce(
        (obj, cur) => ({ ...obj, [cur.id]: cur }),
        {}
      );

      console.log(newState);
      this.setState(newState);
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <MidiRemapView
            sourceColumn={this.state.sourceColumn}
            targetColumn={this.state.targetColumn}
            getNoteForId={this.getNoteForId}
            updatePitchList={this.updatePitchList}
          />
        </React.Fragment>
      </DragDropContext>
    );
  }
}

export default MidiRemap;
