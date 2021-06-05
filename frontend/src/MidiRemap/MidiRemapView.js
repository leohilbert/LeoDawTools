import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MidiNoteColumn from "./components/MidiNoteColumn/MidiNoteColumn";
import Button from "@material-ui/core/Button";
import PresetUpload from "./components/PresetUpload";
import RemapButton from "./components/RemapButton";

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

  midiRemap: {
    marginTop: "1rem",
    marginRight: "20vw",
    marginLeft: "20vw",
  },
});

function MidiRemapView({
  sourceColumn,
  targetColumn,
  getNoteForId,
  updatePitchList,
  updatePreset,
  savePreset,
  buildRemapData,
  updateFilterValue,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 className={classes.title}>Leo's geiles Produkt</h1>
      <div className={classes.headerButtons}>
        <PresetUpload updatePreset={updatePreset} />
        <Button variant="outlined" color="primary" onClick={savePreset}>
          Save Preset
        </Button>
      </div>
      <div className={classes.midiRemap}>
        <div className={classes.doubleTable}>
          <MidiNoteColumn
            column={sourceColumn}
            getNoteForId={getNoteForId}
            updatePitchList={updatePitchList}
            updateFilterValue={updateFilterValue}
            columnId="source"
          />
          <MidiNoteColumn
            column={targetColumn}
            getNoteForId={getNoteForId}
            updatePitchList={updatePitchList}
            updateFilterValue={updateFilterValue}
            columnId="target"
          />
        </div>
        <RemapButton buildRemapData={buildRemapData} />
      </div>
    </React.Fragment>
  );
}

export default MidiRemapView;
