import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
    color: "white",
  },
  dropHere: {
    marginTop: "0.5rem",
    borderWidth: "2px",
    borderStyle: "dashed",
    backgroundColor: "transparent",
    color: "darkgray",
    marginBottom: "1rem",
  },
});

export default function PitchListUpload({ columnId, updatePitchList }) {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    const data = new FormData();
    data.append("file", acceptedFiles);
    axios.post("http://localhost:3001/pitchList", data, {}).then((res) => {
      updatePitchList(columnId, res.data);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    maxFiles: 1,
  });

  return (
    <Card className={classes.dropHere} {...getRootProps()}>
      <CardContent>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={classes.title}>Drop Pitch List here...</p>
        ) : (
          <p className={classes.title}>Drop Pitch List here...</p>
        )}
      </CardContent>
    </Card>
  );
}
