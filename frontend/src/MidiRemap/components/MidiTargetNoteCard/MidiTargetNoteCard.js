import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MidiSourceNoteCard from "../MidiSourceNoteCard";
import MusicPitchName from "../../MusicPitchName";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "1rem",
  },
  title: {
    fontSize: 14,
  },
  dropHere: {
    marginTop: "1rem",
    borderWidth: "2px",
    borderStyle: "dashed",
    backgroundColor: "transparent",
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
        <Card>
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
            <Typography className={classes.title} gutterBottom>
              {MusicPitchName.fromMidi(note.pitch)} ({note.pitch})
            </Typography>
            <Typography variant="h5" component="h2">
              {note.name}
            </Typography>

            <Droppable droppableId={note.id} type="source">
              {(provided) => (
                <Box
                  borderColor="grey.700"
                  border={1}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {renderChildren(provided, note.assignedNotes)}
                </Box>
              )}
            </Droppable>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
