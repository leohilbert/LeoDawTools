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
      data.append("remapData", JSON.stringify(buildRemapData()));
      axios
        .post("http://localhost:3001/remap", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        })
        .then((res) => {
          let fileName =
            res.headers["content-disposition"].split("filename=")[1];
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName); //or any other extension
          document.body.appendChild(link);
          link.click();
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
