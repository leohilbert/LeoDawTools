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
});

export default function MidiTargetNoteCard({ noteId, getNoteForId }) {
  const classes = useStyles();
  const note = getNoteForId(noteId);
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

        <Typography variant="h5" component="h2">
          Mapped Notes:
        </Typography>
        <Droppable droppableId={noteId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {note.assignedNotes.map((noteId, index) => (
                <MidiNoteCard
                  key={noteId}
                  noteId={noteId}
                  getNoteForId={getNoteForId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
}
