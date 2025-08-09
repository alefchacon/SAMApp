import React from "react";
import { Button } from "@/components/ui/button";
import { defaultPhotosheet, IPhotosheet } from "../domain/Photosheet";

interface IPhotosheetProps {
  photosheet: IPhotosheet;
  isTechnicalPerson: boolean;
  onDelete: (photosheetId: number) => void;
  onUpdate: (photosheet: IPhotosheet) => void;
  children: React.ReactNode;
}
export default function Photosheet({
  photosheet = defaultPhotosheet,
  isTechnicalPerson = false,
  onDelete,
  onUpdate,
  children,
}: IPhotosheetProps) {
  if (typeof photosheet.sheet !== "string") {
    return <div>Sheet must be string</div>;
  }

  const sheetURL = photosheet.sheet;

  const technicalPersonButtons = (
    <>
      <Button
        className="icon-only color-white"
        onClick={() => onUpdate(photosheet)}
      ></Button>
      <Button
        className="icon-only color-white danger"
        value={photosheet.id}
        onClick={() => onDelete(photosheet.id)}
      ></Button>
    </>
  );

  const handleDownload = async () => {
    const response = await fetch(sheetURL, { mode: "cors" });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = "sam-ficha.jpg";
    a.click();

    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="photosheet-wrapper flex-row selectable position-relative align-items-end hoverable2">
      <div className="flex-row justify-content-right position-absolute top-0 w-100 show-on-hover bg-black-transparent display-none">
        <Button
          className="icon-only color-white"
          onClick={handleDownload}
        ></Button>
        {isTechnicalPerson && technicalPersonButtons}
      </div>
      <img className="photosheet" src={sheetURL} alt={photosheet.description} />
      <div className="photosheet-description bg-black-transparent color-white w-100 text-wrap position-absolute p-05rem">
        {children}
      </div>
    </div>
  );
}
