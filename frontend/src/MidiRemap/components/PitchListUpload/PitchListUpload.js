import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  dropHere: {
    marginTop: "0.5rem",
    borderWidth: "2px",
    borderStyle: "dashed",
    backgroundColor: "transparent",
    marginBottom: "1rem",
  },
});

export default function PitchListUpload({ columnId, updatePitchList }) {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const data = new FormData();
      data.append("file", acceptedFiles[0]);
      axios
        .post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/pitchList`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          updatePitchList(columnId, res.data.name, res.data.content);
        });
    },
    [columnId, updatePitchList]
  );
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
