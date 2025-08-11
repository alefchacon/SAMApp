import React, { useState } from "react";
import Chip from "./ChipInput";

import { EFileTypes } from "@/stores/EFileTypes";
import ProgressBar from "./ProgressBar";
import { toast } from "sonner";

import { Upload } from "lucide-react";

interface IUploaderImageProps {
  id?: string;
  multiple?: boolean;
  imageURL: string | File;
  onUpload: (file: File | null) => void;
}
export default function UploaderImage({
  id = "upload",
  multiple = false,
  imageURL,
  onUpload,
}: IUploaderImageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const imgURLToUse = files[0] ? URL.createObjectURL(files[0]) : imageURL;

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
    if (!event.target.files) {
      return;
    }
    const newFiles = Array.from(event.target.files);

    parseFiles(newFiles);
  };

  const parseFiles = async (newFiles: File[]) => {
    setIsParsing(true);

    for (let i = 0; i < newFiles.length; i++) {
      const fileTypeIsValid = EFileTypes.IMG.split(",").includes(
        newFiles[0].type
      );
      if (!fileTypeIsValid) {
        setIsParsing(false);
        toast("Debe cargar una imágen");
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
        } flex flex-col justify-center items-center selectable rounded-5 caption relative overflow-hidden`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropFile}
      >
        <ProgressBar visible={isParsing}></ProgressBar>
        {imgURLToUse ? (
          <img
            src={typeof imgURLToUse === "string" ? imgURLToUse : ""}
            alt="Imagen por subir"
            className="photosheet max-h-[250px]"
          />
        ) : (
          <Upload size={"5rem"} />
        )}
        De clic aquí para seleccionar una imágen, o arrástrela
      </label>

      <div className="file-list gap-05rem p-05rem grid">
        {files.map((file, index) => (
          <Chip key={index} index={index} onRemove={handleRemoveFile} />
        ))}
      </div>

      <input
        className="hidden-input"
        type="file"
        id={id}
        accept={EFileTypes.IMG}
        onChange={handleClickFile}
        multiple={multiple}
      />
    </>
  );
}
