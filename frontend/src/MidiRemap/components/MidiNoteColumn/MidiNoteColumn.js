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
});

export default function MidiNoteColumn({
  columnId,
  noteIds,
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
          getNoteForId={getNoteForId}
        />
      );
    }
  };
  const classes = useStyles();
  return (
    <Container className={classes.remapTable}>
      <PitchListUpload columnId={columnId} updatePitchList={updatePitchList} />
      <div className={classes.column}>
        <Droppable droppableId={columnId} type={columnId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {noteIds.map((noteId, index) => renderCard(noteId, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Container>
  );
}
