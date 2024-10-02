import { useState } from "react";
import Papa from "papaparse";
import Button from "./Button";
import Chip from "./ChipInput";
import FileInfo from "./FileInfo";

import { FILE_TYPES_STRING } from "../../stores/fileTypes";
import { useSnackbar } from "../contexts/SnackbarContext";
import ProgressBar from "./ProgressBar";
import { specieSchema } from "../../features/specie/formikSchemas/specieSchema";
import Specie from "../../features/specie/domain/specie";
import Specimen from "../../features/specimens/domain/specimen";
import Location from "../../features/specimens/domain/location";
import Contributor from "../../features/contributors/domain/contributor";

export default function Uploader({
  id = "upload",
  multiple = false,
  buttonLabel = "Label",
  displayExtension = ".CSV",
  accept = FILE_TYPES_STRING.CSV,
  onUpload,
}) {
  const [files, setFiles] = useState([]);
  const [parsedFiles, setParsedFiles] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  //const { showSnackbar } = useSnackbar();

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropFile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const newFiles = event.dataTransfer.files;

    parseFiles(newFiles);
  };

  const handleClickFile = async (event) => {
    const newFiles = Array.from(event.target.files);

    parseFiles(newFiles);
  };

  const parseFiles = async (newFiles = []) => {
    setIsParsing(true);

    for (let i = 0; i < newFiles.length; i++) {
      const fileTypeIsValid = accept.split(",").includes(newFiles[0].type);
      if (!fileTypeIsValid) {
        setIsParsing(false);
        return;
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
    await parseByType(newFiles);
    setIsParsing(false);
  };

  const parseByType = async (fileArray = []) => {
    try {
      switch (accept) {
        case FILE_TYPES_STRING.CSV:
          for (let file of fileArray) {
            parseCSV(file);
          }
          break;
        default:
          setParsedFiles(fileArray);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const equals = (specieA, specieB) => {
    return JSON.stringify(specieA) === JSON.stringify(specieB);
  };

  const handleParsedFiles = (result) => {
    const colectionCsv = result.data;
    const allSpecies = colectionCsv.map((row) => new Specie(row));
    const uniqueSpecies = allSpecies.filter(
      (specieA, index, self) =>
        index === self.findIndex((specieB) => equals(specieA, specieB))
    );
    const speciesWithSpecimens = uniqueSpecies.map((specie) => {
      const specimenData = colectionCsv.filter((row) =>
        equals(specie, new Specie(row))
      );
      specie.specimens = specimenData.map((data) => {
        let specimen = new Specimen(data);
        specimen.location = new Location(data);
        specimen.colector = new Contributor(data.colector_code);
        specimen.preparator = new Contributor(data.preparator_code);
        return specimen;
      });
      return specie;
    });

    setParsedFiles(speciesWithSpecimens);
  };

  function parseCSV(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        handleParsedFiles(result);
      },
      error: (error) => {
        console.error("Error while parsing:", error);
      },
    });
  }

  const handleRemoveFile = (indexToDelete = 0) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToDelete));
    setParsedFiles((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleUpload = async () => {
    onUpload(parsedFiles);
  };

  return (
    <div className="flex-col w-100">
      <label
        htmlFor={id}
        className={`${
          isDragging && "selected"
        } flex-col justify-content-center align-items-center selectable border rounded-20 caption`}
        style={{ overflow: "hidden", paddingBottom: "1rem" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropFile}
      >
        <ProgressBar visible={isParsing}></ProgressBar>
        <span
          style={{ fontSize: "6vw" }}
          className="material-symbols-outlined p-1rem"
        >
          upload
        </span>
        Clic para seleccionar su archivo {displayExtension}, o arrastrelo aquí.
      </label>

      <div className="file-list gap-05rem p-05rem grid">
        {files.map((file, index) => (
          <Chip index={index} onRemove={handleRemoveFile}>
            <FileInfo
              fileType={file.name.split(".").pop()}
              fileName={file.name}
            />
          </Chip>
        ))}
      </div>

      <div className="button-row">
        <Button onClick={handleUpload}>{buttonLabel}</Button>
      </div>

      <input
        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
        type="file"
        id={id}
        accept={accept}
        onChange={handleClickFile}
        multiple={multiple}
      />
    </div>
  );
}
