import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MidiNoteColumn from "./components/MidiNoteColumn/MidiNoteColumn";
import Button from "@material-ui/core/Button";
import PresetUpload from "./components/PresetUpload";
import RemapButton from "./components/RemapButton";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  doubleTable: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  title: {
    textAlign: "center",
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
  columns,
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
      <Typography variant="h2" className={classes.title} color="textPrimary">
        Midi Remap
      </Typography>
      <div className={classes.headerButtons}>
        <PresetUpload updatePreset={updatePreset} />
        <Button variant="outlined" onClick={savePreset}>
          Save Preset
        </Button>
      </div>
      <div className={classes.midiRemap}>
        <div className={classes.doubleTable}>
          <MidiNoteColumn
            column={columns.source}
            getNoteForId={getNoteForId}
            updatePitchList={updatePitchList}
            updateFilterValue={updateFilterValue}
            columnId="source"
          />
          <MidiNoteColumn
            column={columns.target}
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
