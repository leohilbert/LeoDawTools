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

function MidiRemapView({ sourceColumn, targetColumn, getNoteForId }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 className={classes.title}>Leo's geiles Produkt</h1>
      <div className={classes.doubleTable}>
        <MidiNoteColumn
          noteIds={sourceColumn}
          getNoteForId={getNoteForId}
          columnId="source"
        />
        <MidiNoteColumn
          noteIds={targetColumn}
          getNoteForId={getNoteForId}
          columnId="target"
        />
      </div>
    </React.Fragment>
  );
}

export default MidiRemapView;
