import React from "react";
import { Button } from "@/components/ui/button";
import { defaultPhotosheet, IPhotosheet } from "../domain/Photosheet";
import { Download, Trash, Edit, Expand } from "lucide-react";

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
        onClick={() => onUpdate(photosheet)}
        variant={"ghost"}
        className="text-white hover:color-black"
      >
        <Edit />
      </Button>
      <Button
        value={photosheet.id}
        onClick={() => onDelete(photosheet.id)}
        variant={"ghost"}
        className="text-white hover:color-black"
      >
        <Trash />
      </Button>
    </>
  );

  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = sheetURL;
    link.download = "image.png";
    link.target = "_blank"; // Opens in new tab if download fails
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="photosheet-wrapper flex-row selectable position-relative align-items-end hoverable2">
      <div className="flex-row justify-content-right position-absolute top-0 w-100 show-on-hover bg-black-transparent display-none">
        <Button
          onClick={handleDownload}
          variant={"ghost"}
          className="text-white hover:color-black"
        >
          <Expand></Expand>
        </Button>
        {isTechnicalPerson && technicalPersonButtons}
      </div>
      <img className="photosheet" src={sheetURL} alt={photosheet.description} />
      <div className="photosheet-description bg-black-transparent color-white w-100 text-wrap position-absolute p-05rem">
        {children}
      </div>
    </div>
  );
}
