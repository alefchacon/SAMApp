import { EFileTypes } from "@/stores/EFileTypes";
import React from "react";

interface IFileInfo {
  fileName?: string;
  fileType?: string;
}
export default function FileInfo({ fileName, fileType }: IFileInfo) {
  return (
    <div className="ellipsis">
      {fileName}
      <div className="caption ellipsis">{fileType}</div>
    </div>
  );
}
