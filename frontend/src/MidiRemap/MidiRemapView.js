import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MidiNoteColumn from "./components/MidiNoteColumn/MidiNoteColumn";

const useStyles = makeStyles({
  doubleTable: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "8rem",
  },
  title: {
    textAlign: "center",
    color: "white",
  },
});

function MidiRemapView({ sourceNotes, targetNotes }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 className={classes.title}>Leo's geiles Produkt</h1>
      <div className={classes.doubleTable}>
        <MidiNoteColumn notes={sourceNotes} columnId="source" />
        <MidiNoteColumn notes={targetNotes} columnId="target" />
      </div>
    </React.Fragment>
  );
}

export default MidiRemapView;
