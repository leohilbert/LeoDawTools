import React from "react";
import { Container } from "@material-ui/core";
import MidiSourceNoteCard from "../MidiSourceNoteCard";
import MidiTargetNoteCard from "../MidiTargetNoteCard";
import { Droppable } from "react-beautiful-dnd";
import PitchListUpload from "../PitchListUpload/PitchListUpload";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  column: {
    border: "1px solid rgba(50, 50, 50, .5)",
    padding: "0.5rem",
    minHeight: "6rem",
  },
  remapTable: {
    "&:nth-child(1)": {
      paddingLeft: "0",
    },
    "&:nth-child(2)": {
      paddingRight: "0",
    },
  },
  pitchListName: {
    minHeight: "2rem",
    color: "white",
  },
});

export default function MidiNoteColumn({
  columnId,
  column,
  getNoteForId,
  updatePitchList,
}) {
  const renderCard = (noteId, index) => {
    if (columnId === "source") {
      return (
        <MidiSourceNoteCard
          key={noteId}
          noteId={noteId}
          index={index}
          columnId={columnId}
          getNoteForId={getNoteForId}
        />
      );
    } else {
      return (
        <MidiTargetNoteCard
          key={noteId}
          noteId={noteId}
          index={index}
          getNoteForId={getNoteForId}
        />
      );
    }
  };
  const classes = useStyles();
  return (
    <Container className={classes.remapTable}>
      <h2 className={classes.pitchListName}>{column.name}</h2>
      <PitchListUpload columnId={columnId} updatePitchList={updatePitchList} />
      <div className={classes.column}>
        <Droppable droppableId={columnId} type={columnId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {column.content.map((noteId, index) => renderCard(noteId, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Container>
  );
}
