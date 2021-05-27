import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MidiNoteList from "./components/MidiNoteList/MidiNoteList";
import MidiNoteSourceCard from "./components/MidiNoteSourceCard";
import MidiNoteTargetCard from "./components/MidiNoteTargetCard";

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

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 className={classes.title}>Leo's geiles Produkt</h1>
      <div className={classes.doubleTable}>
        <MidiNoteList
          content={[
            <MidiNoteSourceCard name="SourceSnare" pitch="540" />,
            <MidiNoteSourceCard name="SourceSnare" pitch="540" />,
          ]}
        ></MidiNoteList>
        <MidiNoteList
          content={[
            <MidiNoteTargetCard name="TargetSnare" pitch="540" content={[]} />,
            <MidiNoteTargetCard name="TargetSnare" pitch="540" content={[]} />,
          ]}
        ></MidiNoteList>
      </div>
    </React.Fragment>
  );
}

export default App;
