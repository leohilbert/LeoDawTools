import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useDropzone } from "react-dropzone";
import SendIcon from "@material-ui/icons/Send";

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
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = new FormData();
        let midiBase64 = reader.result.substr(reader.result.indexOf(",") + 1);
        data.append("midi", midiBase64);
        data.append("remapData", JSON.stringify(buildRemapData()));
        axios
          .post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/remap`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          })
          .then((res) =>
            res.data.text().then((convertedMidiBase64) => {
              let fileName = acceptedFiles[0].name.replace(/\.[^/.]+$/, "");
              const link = document.createElement("a");
              link.href =
                "data:application/octet-stream;base64," + convertedMidiBase64;
              console.log(acceptedFiles[0]);
              console.log(reader);
              link.download = fileName + "-remapped.mid";
              document.body.appendChild(link);
              link.click();
              link.remove();
            })
          );
      };
      reader.readAsDataURL(acceptedFiles[0]);
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
      endIcon={<SendIcon />}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop Midi here!</p> : <p>REMAP</p>}
    </Button>
  );
}
