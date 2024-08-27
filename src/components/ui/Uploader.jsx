import { useState } from "react";
import Papa from "papaparse";

import { FILE_TYPES_STRING } from "../../stores/fileTypes";
import { useSnackbar } from "../contexts/SnackbarContext";
import ProgressBar from "./ProgressBar";

export default function Uploader({
  id = "upload",
  accept = FILE_TYPES_STRING.CSV,
  onParse,
}) {
  //const [jsonData, setJsonData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  //const { showSnackbar } = useSnackbar();

  const getParseMethod = (file) => {
    switch (accept) {
      case FILE_TYPES_STRING.CSV:
        parseCSV(file);
        break;
    }
  };

  function parseCSV(file) {
    setIsParsing(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        //setJsonData(result.data);
        setIsParsing(false);
        onParse(result.data);
      },
      error: (error) => {
        console.error("Error while parsing:", error);
      },
    });
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropUpload = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];

    const fileTypeIsValid = accept.split(",").includes(file.type);
    if (!fileTypeIsValid) {
      console.log("NOPE!!!");
      return;
    }

    getParseMethod(file);
  };

  const handleClickUpload = (event) => {
    const file = event.target.files[0];
    getParseMethod(file);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`${
          isDragging && "selected"
        } flex-col justify-content-center align-items-center selectable border rounded-20 caption`}
        style={{ overflow: "hidden", paddingBottom: "1rem" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropUpload}
      >
        <ProgressBar visible={isParsing}></ProgressBar>
        <span
          style={{ fontSize: "6vw" }}
          className="material-symbols-outlined p-1rem"
        >
          upload
        </span>
        Clic para seleccionar su archivo .CSV, o arrastrelo aquí.
      </label>

      <input
        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
        type="file"
        id={id}
        accept={accept}
        onChange={handleClickUpload}
      />
    </>
  );
}
