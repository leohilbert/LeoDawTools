import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Droppable } from "react-beautiful-dnd";
import MidiNoteCard from "../MidiSourceNoteCard";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "1rem",
    color: "white",
    backgroundColor: "#1d1d1d",
  },
  title: {
    fontSize: 14,
    color: "white",
  },
  dropHere: {
    marginTop: "1rem",
    borderWidth: "2px",
    borderStyle: "dashed",
    backgroundColor: "transparent",
    borderColor: "darkgray",
    color: "white",
  },
});

export default function MidiTargetNoteCard({ noteId, getNoteForId }) {
  const classes = useStyles();
  const note = getNoteForId(noteId);

  const renderChildren = (provided, assignedNotes) => {
    if (assignedNotes && assignedNotes.length) {
      return (
        <div>
          {assignedNotes.map((noteId, index) => (
            <MidiNoteCard
              key={noteId}
              noteId={noteId}
              getNoteForId={getNoteForId}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      );
    } else {
      return (
        <Card className={classes.dropHere}>
          <CardContent>
            {provided.placeholder}
            Drop Notes here
          </CardContent>
        </Card>
      );
    }
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {note.pitch}
        </Typography>
        <Typography variant="h5" component="h2">
          {note.name}
        </Typography>

        <Droppable droppableId={noteId} type="source">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderChildren(provided, note.assignedNotes)}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
}
