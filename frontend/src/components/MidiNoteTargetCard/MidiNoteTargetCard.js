import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useDrop } from "react-dnd";
import MidiNoteItemTypes from "../../constants/MidiNoteItemTypes";
import MidiNoteSourceCard from "../MidiNoteSourceCard";

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

export default function MidiNoteTargetCard({ name, pitch, content }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: MidiNoteItemTypes.MIDI_NOTE_SOURCE_CARD,
      drop: (item, monitor) => {
        console.log(item);
        //  content.push(monitor.getItem());
        return undefined;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const classes = useStyles();
  return (
    <Card className={classes.root} ref={drop}>
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
        {content.length}
        <div>{content}</div>
      </CardContent>
    </Card>
  );
}
