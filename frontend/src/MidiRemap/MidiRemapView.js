import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MidiNoteColumn from "./components/MidiNoteColumn/MidiNoteColumn";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  doubleTable: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  title: {
    textAlign: "center",
    color: "white",
  },
  headerButtons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  remapButton: {
    display: "flex",
    margin: "auto",
    marginTop: "3rem",
    width: "100%",
  },
  midiRemap: {
    marginTop: "6rem",
    marginRight: "20vw",
    marginLeft: "20vw",
  },
});

function MidiRemapView({
  sourceColumn,
  targetColumn,
  getNoteForId,
  updatePitchList,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 className={classes.title}>Leo's geiles Produkt</h1>
      <div className={classes.headerButtons}>
        <Button variant="outlined" color="primary">
          Load Preset
        </Button>
        <Button variant="outlined" color="primary">
          Save Preset
        </Button>
      </div>
      <div className={classes.midiRemap}>
        <div className={classes.doubleTable}>
          <MidiNoteColumn
            noteIds={sourceColumn}
            getNoteForId={getNoteForId}
            updatePitchList={updatePitchList}
            columnId="source"
          />
          <MidiNoteColumn
            noteIds={targetColumn}
            getNoteForId={getNoteForId}
            updatePitchList={updatePitchList}
            columnId="target"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.remapButton}
        >
          REMAP
        </Button>
      </div>
    </React.Fragment>
  );
}

export default MidiRemapView;
