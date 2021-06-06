import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MidiNoteColumn from "./components/MidiNoteColumn/MidiNoteColumn";
import Button from "@material-ui/core/Button";
import LoadPreset from "./components/LoadPreset";
import RemapButton from "./components/RemapButton";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import githubIconSvg from "../assets/svg/github.svg";
import SaveIcon from "@material-ui/icons/Save";

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
  githubButton: {
    marginTop: "0.3rem",
    float: "right",
    backgroundColor: "#3fb950",
    color: "white",
    lineHeight: "1",
    "&:hover": {
      backgroundColor: "white",
      color: "#3fb950",
    },
  },
  githubIcon: {
    height: "100%",
    overflow: "auto",
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
  const githubIcon = (
    <Icon>
      <img className={classes.githubIcon} alt="github" src={githubIconSvg} />
    </Icon>
  );

  return (
    <React.Fragment>
      <Typography variant="h2" className={classes.title} color="textPrimary">
        Midi Remap
      </Typography>
      <div className={classes.headerButtons}>
        <LoadPreset updatePreset={updatePreset} />
        <Button
          variant="outlined"
          onClick={savePreset}
          startIcon={<SaveIcon />}
        >
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
        <Button
          variant="outlined"
          href="https://github.com/leohilbert/LeoDawTools"
          className={classes.githubButton}
          startIcon={githubIcon}
        >
          GITHUB
        </Button>
      </div>
    </React.Fragment>
  );
}

export default MidiRemapView;
