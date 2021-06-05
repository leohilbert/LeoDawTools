import React from "react";
import MidiRemapView from "./MidiRemapView";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  notes: {},
  columns: {
    source: {
      name: "",
      filter: "",
      content: [],
    },
    target: {
      name: "",
      filter: "",
      content: [],
    },
  },
};

class MidiRemap extends React.Component {
  state = initialData;

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <MidiRemapView
            columns={this.state.columns}
            getNoteForId={(noteId) => this.getNoteForId(noteId)}
            updatePitchList={(columnId, name, pitchList) =>
              this.updatePitchList(columnId, name, pitchList)
            }
            buildRemapData={() => this.buildRemapData(this.state)}
            updatePreset={(loadedState) => this.setState(loadedState)}
            savePreset={() => this.savePreset()}
            updateFilterValue={(columnId, value) => {
              let newState = { ...this.state };
              newState.columns[columnId].filter = value;
              this.setState(newState);
            }}
          />
        </React.Fragment>
      </DragDropContext>
    );
  }

  savePreset() {
    this.resetFilters();
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `pitchRemapPreset-${this.state.columns.source.name}-${this.state.columns.target.name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  resetFilters() {
    let newState = { ...this.state };
    Object.values(newState.columns).map((column) => {
      column.filter = "";
      return null;
    });
    this.setState(newState);
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

    let sourceColumn = newState.columns[source.droppableId];
    if (sourceColumn) {
      sourceColumn.content.splice(source.index, 1);
    } else {
      // Inside a TargetNote
      let targetNote = newState.notes[source.droppableId];
      targetNote.assignedNotes.splice(source.index, 1);
    }

    let destColumn = newState.columns[destination.droppableId];
    if (destColumn) {
      destColumn.content.splice(destination.index, 0, draggableId);
    } else {
      // Inside a TargetNote
      let targetNote = newState.notes[destination.droppableId];
      targetNote.assignedNotes.splice(destination.index, 0, draggableId);
    }

    //console.log(newState);
    this.setState(newState);
  };

  getNoteForId(noteId) {
    return this.state.notes[noteId];
  }

  updatePitchList(columnId, name, pitchList) {
    const newState = JSON.parse(JSON.stringify(this.state));

    let columnToUpdate;
    let columnToPreserve;
    const updateSource = columnId === "source"; // otherwise target
    if (updateSource) {
      columnToPreserve = newState.columns.target;
      columnToUpdate = newState.columns.source;
    } else {
      columnToPreserve = newState.columns.source;
      columnToUpdate = newState.columns.target;
    }

    const newNotes = [];
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

    columnToUpdate.name = name;
    columnToUpdate.content = newContent;

    newState.notes = newNotes.reduce(
      (obj, cur) => ({ ...obj, [cur.id]: cur }),
      {}
    );

    console.log(newState);
    this.setState(newState);
  }

  buildRemapData(state) {
    const remapList = state.columns.target.content.flatMap((noteId) => {
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
}

export default MidiRemap;
