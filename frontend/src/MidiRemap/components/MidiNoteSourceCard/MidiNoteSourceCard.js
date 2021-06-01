import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";

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

export default function MidiNoteSourceCard({ note, index }) {
  const classes = useStyles();
  return (
    <Draggable draggableId={note.pitch.toString()} index={index}>
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
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
