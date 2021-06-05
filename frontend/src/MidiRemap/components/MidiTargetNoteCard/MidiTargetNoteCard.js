import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MidiSourceNoteCard from "../MidiSourceNoteCard";

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

export default function MidiTargetNoteCard({ note, index, getNoteForId }) {
  const classes = useStyles();

  const renderChildren = (provided, assignedNotes) => {
    if (assignedNotes && assignedNotes.length) {
      return (
        <div>
          {assignedNotes.map((noteId, index) => (
            <MidiSourceNoteCard
              key={noteId}
              note={getNoteForId(noteId)}
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
    <Draggable draggableId={note.id} index={index} type="target">
      {(provided) => (
        <Card
          className={classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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

            <Droppable droppableId={note.id} type="source">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {renderChildren(provided, note.assignedNotes)}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
