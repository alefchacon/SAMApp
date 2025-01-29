import { useState } from "react";
import Chip from "./ChipInput";

import { FILE_TYPES_STRING } from "../../stores/fileTypes";
import ProgressBar from "./ProgressBar";
import { useSnackbar } from "../contexts/SnackbarContext";
export default function UploaderImage({
  id = "upload",
  multiple = false,
  imageURL = null,
  buttonLabel = "Label",
  displayExtension = ".CSV",
  onUpload,
}) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const {showSnackbar} = useSnackbar();
  const imgURLToUse = files[0] ? URL.createObjectURL(files[0]) : imageURL;

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
      const fileTypeIsValid = FILE_TYPES_STRING.IMG.split(",").includes(
        newFiles[0].type
      );
      if (!fileTypeIsValid) {
        setIsParsing(false);
        showSnackbar("Debe cargar una imágen", true)
        return;
      }
    }

    setFiles(newFiles);
    setIsParsing(false);

    onUpload(newFiles[0]);
  };

  const handleRemoveFile = (indexToDelete = 0) => {
    setFiles((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToDelete)
    );

    onUpload(null);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`${
          isDragging && "selected"
        } flex-col justify-content-center align-items-center selectable rounded-5 caption img-container position-relative overflow-hidden`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropFile}
      >
        <ProgressBar visible={isParsing}></ProgressBar>
        {imgURLToUse ? (
          <img
            src={imgURLToUse}
            alt="Imagen por subir"
            className="photosheet"
          />
        ) : (
          <span
            className="material-symbols-outlined p-1rem font-size-4rem"
          >
            upload
          </span>
        )}
        De clic aquí para seleccionar una imágen, o arrástrela
      </label>

      <div className="file-list gap-05rem p-05rem grid">
        {files.map((file, index) => (
          <Chip
            key={index}
            index={index}
            fileName={file.name}
            extension={file.name.split(".").pop()}
            onRemove={handleRemoveFile}
          />
        ))}
      </div>

      <input
        className="hidden-input"
        type="file"
        id={id}
        accept={FILE_TYPES_STRING.IMG}
        onChange={handleClickFile}
        multiple={multiple}
      />
    </>
  );
}
