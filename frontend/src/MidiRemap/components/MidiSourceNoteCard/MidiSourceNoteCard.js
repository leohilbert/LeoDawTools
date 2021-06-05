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
  rootDragged: {
    filter: "drop-shadow(0 0 1rem crimson);",
  },
  title: {
    fontSize: 14,
    color: "white",
  },
});

export default function MidiSourceNoteCard({ note, index }) {
  const classes = useStyles();
  return (
    <Draggable draggableId={note.id} index={index} type="source">
      {(provided, snapshot) => (
        <Card
          className={`${snapshot.isDragging ? classes.rootDragged : ""} ${
            classes.root
          }`}
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
