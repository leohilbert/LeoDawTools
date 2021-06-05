import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

//const useStyles = makeStyles({});

export default function PresetUpload({ updatePreset }) {
  //const classes = useStyles();

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
    <React.Fragment>
      <Button variant="outlined" {...getRootProps()} startIcon={<CloudUploadIcon  />}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop Preset here</p> : <p>Load Preset</p>}
      </Button>
    </React.Fragment>
  );
}
