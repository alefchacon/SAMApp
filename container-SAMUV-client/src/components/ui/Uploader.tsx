import React, { useState } from "react";
import Papa from "papaparse";
import Chip from "./ChipInput";
import FileInfo from "./FileInfo";

import { EFileTypes } from "../../stores/EFileTypes";
import ProgressBar from "./ProgressBar";
import { Specie } from "@/features/specie/domain/Specie";
import Specimen from "@/features/specimens/domain/model/Specimen";
import Location, {
  ILocation,
} from "@/features/specimens/domain/model/Location";
import Contributor, {
  IContributor,
} from "@/features/contributors/domain/Contributor";
import { EContributorRoles } from "@/stores/EContributorRoles";

interface IUploaderProps {
  id?: string;
  multiple?: boolean;
  buttonLabel?: string;
  displayExtension?: string;
  accept?: EFileTypes.CSV;
  onUpload?: () => void;
  onParse?: (speciesWithSpecimens: Specie[]) => void;
}
export default function Uploader({
  id = "upload",
  multiple = false,
  buttonLabel = "Label",
  displayExtension = ".CSV",
  accept = EFileTypes.CSV,
  onUpload,
  onParse,
}: IUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [parsedFiles, setParsedFiles] = useState<Specie[]>();
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropFile = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(event.dataTransfer.files);

    parseFiles(newFiles);
  };

  const handleClickFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.error("FUCK!");

    if (!event.target.files) {
      return;
    }

    const newFiles = Array.from(event.target.files);

    parseFiles(newFiles);
  };

  const parseFiles = async (newFiles: File[] = []) => {
    setIsParsing(true);

    for (let i = 0; i < newFiles.length; i++) {
      const fileTypeIsValid = accept.split(",").includes(newFiles[0].type);
      if (!fileTypeIsValid) {
        setIsParsing(false);
        return;
      }
    }

    setFiles((previousFiles) => [...previousFiles, ...newFiles]);

    console.error(newFiles);

    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target && event.target.result) {
        parseCSV(event.target.result);
        setIsParsing(false);
      }
    };
    reader.readAsText(newFiles[0], "ISO-8859-1");
  };

  const equals = (specieA: Specie, specieB: Specie) => {
    return JSON.stringify(specieA) === JSON.stringify(specieB);
  };

  const getUniqueSpecies = (colectionCsv: any[]) => {
    const allSpecies = colectionCsv.map((row) => new Specie(row));
    return allSpecies.filter(
      (specieA, index, self) =>
        index === self.findIndex((specieB) => equals(specieA, specieB))
    );
  };

  const groupSpecimensBySpecie = (
    uniqueSpecies: Specie[],
    colectionCsv: any[]
  ) => {
    return uniqueSpecies.map((specie) => {
      const specimenData = colectionCsv.filter((row) =>
        equals(specie, new Specie(row))
      );
      specie.specimens = specimenData.map((data) => {
        let specimen = new Specimen(data);
        specimen.location = new Location(data as ILocation);
        specimen.colector = new Contributor(
          data as IContributor,
          EContributorRoles.COLECTOR
        );
        specimen.preparator = new Contributor(
          data as IContributor,
          EContributorRoles.PREPARATOR
        );
        return specimen;
      });
      return specie;
    });
  };

  const handleParsedFiles = (result: Papa.ParseResult<unknown>) => {
    const colectionCsv = result.data as Specie[];
    const uniqueSpecies = getUniqueSpecies(colectionCsv);

    const speciesWithSpecimens = groupSpecimensBySpecie(
      uniqueSpecies,
      colectionCsv
    );

    console.error(speciesWithSpecimens);

    onParse(speciesWithSpecimens);
    setParsedFiles(speciesWithSpecimens);
  };

  function parseCSV(file: File) {
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
    setParsedFiles((previousParsedFiles) => {
      if (!previousParsedFiles) {
        return [];
      }
      previousParsedFiles.filter((_, index) => index !== indexToDelete);
    });
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
        <span className="material-symbols-outlined p-1rem font-size-4rem">
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
