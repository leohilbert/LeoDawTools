import React from "react";
import MidiRemapView from "./MidiRemapView";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  notes: {},
  sourceColumn: {
    name: "",
    content: [],
  },
  targetColumn: {
    name: "",
    content: [],
  },
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
      newState.sourceColumn.content.splice(source.index, 1);
    } else if (source.droppableId === "target") {
      // Must be a target-note
      newState.targetColumn.content.splice(source.index, 1);
    } else {
      // Inside a TargetNote
      let targetNote = newState.notes[source.droppableId];
      targetNote.assignedNotes.splice(source.index, 1);
    }

    if (destination.droppableId === "source") {
      newState.sourceColumn.content.splice(destination.index, 0, draggableId);
    } else if (source.droppableId === "target") {
      // Must be a target-note
      newState.targetColumn.content.splice(destination.index, 0, draggableId);
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

  updatePitchList(columnId, name, pitchList) {
    const newState = JSON.parse(JSON.stringify(this.state));

    const updateSource = columnId === "source"; // otherwise target

    const newNotes = [];
    const columnToPreserve = updateSource
      ? newState.targetColumn
      : newState.sourceColumn;

    columnToPreserve.content.map((noteId) => {
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

    const newContent = pitchList.map((note) => {
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

    let newColumn = {
      name: name,
      content: newContent,
    };
    if (updateSource) newState.sourceColumn = newColumn;
    else newState.targetColumn = newColumn;

    newState.notes = newNotes.reduce(
      (obj, cur) => ({ ...obj, [cur.id]: cur }),
      {}
    );

    console.log(newState);
    this.setState(newState);
  }

  buildRemapData(state) {
    const remapList = state.targetColumn.content.flatMap((noteId) => {
      const note = this.getNoteForId(noteId);
      return note.assignedNotes.flatMap((assignedNoteId) => {
        const assignedNote = this.getNoteForId(assignedNoteId);
        return {
          from: assignedNote.pitch,
          to: note.pitch,
        };
      });
    });
    return remapList.reduce((obj, cur) => ({ ...obj, [cur.from]: cur.to }), {});
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
            buildRemapData={() => this.buildRemapData(this.state)}
            updatePreset={(state) => this.setState(state)}
            savePreset={() => {
              const element = document.createElement("a");
              const file = new Blob([JSON.stringify(this.state)], {
                type: "application/json",
              });
              element.href = URL.createObjectURL(file);
              element.download = `pitchRemapPreset-${this.state.sourceColumn.name}-${this.state.targetColumn.name}.json`;
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
            }}
          />
        </React.Fragment>
      </DragDropContext>
    );
  }
}

export default MidiRemap;
