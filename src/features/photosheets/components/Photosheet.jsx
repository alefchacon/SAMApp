import Button from "../../../components/ui/Button";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { SERVER_URL } from "../../../config/env";

export default function Photosheet({
  photosheet = {
    id: 0,
    description: "description",
    sheet: "src/assets/images/0.webp",
  },
  isTechnicalPerson = false,
  onDelete,
  onUpdate,
  children
}) {
  const sheetURL = photosheet.sheet;

  const technicalPersonButtons = (
    <>
      <Button
        className="icon-only color-white"
        iconType="edit"
        value={photosheet}
        onClick={onUpdate}
      ></Button>
      <Button
        className="icon-only color-white danger"
        iconType="delete"
        value={photosheet.id}
        onClick={onDelete}
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
    <div
      className="photosheet-wrapper flex-row selectable position-relative align-items-end hoverable2"
    >
      <div
        className="flex-row justify-content-right position-absolute top-0 w-100 show-on-hover bg-black-transparent display-none"
      >
        <Button
          className="icon-only color-white"
          iconType="download"
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
