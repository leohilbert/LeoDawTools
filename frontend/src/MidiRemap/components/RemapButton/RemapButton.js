import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles({
  remapButton: {
    display: "flex",
    margin: "auto",
    marginTop: "3rem",
    width: "100%",
  },
});

export default function RemapButton({ buildRemapData }) {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const data = new FormData();
      data.append("midi", acceptedFiles[0]);
      data.append("remapData", buildRemapData());
      axios
        .post("http://localhost:3001/remap", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    [buildRemapData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    maxFiles: 1,
  });

  return (
    <Button
      {...getRootProps()}
      variant="contained"
      color="primary"
      className={classes.remapButton}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop Midi here!</p> : <p>REMAP</p>}
    </Button>
  );
}
