import { useState } from "react";
import Papa from "papaparse";
import Chip from "./ChipInput";
import FileInfo from "./FileInfo";

import { FILE_TYPES_STRING } from "../../stores/fileTypes";
import ProgressBar from "./ProgressBar";
import Specie from "../../features/specie/domain/specie";
import Specimen from "../../features/specimens/domain/specimen";
import Location from "../../features/specimens/domain/location";
import Contributor from "../../features/contributors/domain/contributor";
import CONTRIBUTOR_ROLES from "../../stores/contributorRoles";

export default function Uploader({
  id = "upload",
  multiple = false,
  buttonLabel = "Label",
  displayExtension = ".CSV",
  accept = FILE_TYPES_STRING.CSV,
  onUpload,
  onParse,
}) {
  const [files, setFiles] = useState([]);
  const [parsedFiles, setParsedFiles] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

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

    setFiles((previousFiles) => [...previousFiles, ...newFiles]);
    const reader = new FileReader();
    reader.onload = function (event) {
      parseCSV(event.target.result);
      setIsParsing(false);
    };
    reader.readAsText(newFiles[0], "ISO-8859-1");
  };

  const equals = (specieA, specieB) => {
    return JSON.stringify(specieA) === JSON.stringify(specieB);
  };

  const getUniqueSpecies = (colectionCsv) => {
    const allSpecies = colectionCsv.map((row) => new Specie(row));
    return allSpecies.filter(
      (specieA, index, self) =>
        index === self.findIndex((specieB) => equals(specieA, specieB))
    );
  }

  const groupSpecimensBySpecie = (uniqueSpecies, colectionCsv) => {
    return uniqueSpecies.map((specie) => {
      const specimenData = colectionCsv.filter((row) =>
        equals(specie, new Specie(row))
      );
      specie.specimens = specimenData.map((data) => {
        let specimen = new Specimen(data);
        specimen.location = new Location(data);
        specimen.colector = new Contributor(
          data, 
          CONTRIBUTOR_ROLES.COLECTOR
        );
        specimen.preparator = new Contributor(
          data,
          CONTRIBUTOR_ROLES.PREPARATOR
        );
        return specimen;
      });
      return specie;
    });
  }

  const handleParsedFiles = (result) => {
    const colectionCsv = result.data;
    const uniqueSpecies = getUniqueSpecies(colectionCsv)

    const speciesWithSpecimens = groupSpecimensBySpecie(uniqueSpecies, colectionCsv);
    
    onParse(speciesWithSpecimens);
    setParsedFiles(speciesWithSpecimens);
  };
  
  function parseCSV(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: "ISO-8859-1",

      complete: (result) => {
        handleParsedFiles(result);
      },
      error: (error) => {
        console.error("Error while parsing:", error);
      },
    });
  }

  const handleRemoveFile = (indexToDelete = 0) => {
    setFiles((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToDelete)
    );
    setParsedFiles((previousParsedFiles) =>
      previousParsedFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="flex-col w-100">
      <label
        htmlFor={id}
        className={`${
          isDragging && "selected"
        } flex-col overflow-hidden justify-content-center align-items-center selectable border rounded-5 caption`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropFile}
      >
        <ProgressBar visible={isParsing}></ProgressBar>
        <span
          className="material-symbols-outlined p-1rem font-size-4rem"
        >
          upload
        </span>
        Clic para seleccionar su archivo {displayExtension}, o arrastrelo aquí.
        <br></br>
        <br></br>
      </label>

      <div className="file-list gap-05rem p-05rem grid">
        {files.map((file, index) => (
          <Chip key={index} index={index} onRemove={handleRemoveFile}>
            <FileInfo
              fileType={file.name.split(".").pop()}
              fileName={file.name}
            />
          </Chip>
        ))}
      </div>

      <input
        className="hidden-input"
        type="file"
        id={id}
        accept={accept}
        onChange={handleClickFile}
        multiple={multiple}
      />
    </div>
  );
}
