import React from "react";
import MidiRemapView from "./MidiRemapView";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  notes: {},
  sourceColumn: [],
  targetColumn: [],
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

    const updateSource = columnId === "source"; // otherwise target

    const newNotes = [];
    const columnToPreserve = updateSource
      ? newState.targetColumn
      : newState.sourceColumn;

    columnToPreserve.map((noteId) => {
      let note = this.getNoteForId(noteId);
      newNotes.push({
        id: note.id,
        pitch: note.pitch,
        name: note.name,
        target: note.target,
        assignedNotes: [],
      });
      return null;
    });

    const columnToUpdate = pitchList.map((note) => {
      const noteId = columnId + "-" + note.pitch;
      newNotes.push({
        id: noteId,
        pitch: note.pitch,
        name: note.name,
        target: !updateSource,
        assignedNotes: [],
      });
      return noteId;
    });

    if (updateSource) newState.sourceColumn = columnToUpdate;
    else newState.targetColumn = columnToUpdate;

    newState.notes = newNotes.reduce(
      (obj, cur) => ({ ...obj, [cur.id]: cur }),
      {}
    );

    console.log(newState);
    this.setState(newState);
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
