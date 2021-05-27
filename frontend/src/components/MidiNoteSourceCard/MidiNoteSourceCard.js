import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useDrag } from "react-dnd";
import MidiNoteItemTypes from "../../constants/MidiNoteItemTypes";

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

export default function MidiNoteSourceCard({ name, pitch }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: MidiNoteItemTypes.MIDI_NOTE_SOURCE_CARD,
    item: { id: "test" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {pitch}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
