import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import MidiRemap from "./MidiRemap";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MidiRemap />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
