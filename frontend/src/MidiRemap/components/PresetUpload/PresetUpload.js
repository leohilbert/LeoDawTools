import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
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

export default function PresetUpload({ updatePreset }) {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        updatePreset(JSON.parse(fileReader.result.toString()));
      };
      fileReader.readAsText(acceptedFiles[0]);
    },
    [updatePreset]
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
          <p className={classes.title}>Load Preset</p>
        ) : (
          <p className={classes.title}>Drop Preset here</p>
        )}
      </CardContent>
    </Card>
  );
}
