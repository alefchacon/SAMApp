import Button from "../../../components/ui/Button";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export default function Photosheet({
  role = ROLE_TYPES.VISITOR,
  id = 0,
  sheetURL = "src/assets/images/0.webp",
  description = "Descripción de la ficha fotográfica",
  isTechnicalPerson = false,
  onDelete,
}) {
  const technicalPersonButtons = (
    <>
      <Button className="icon-only color-white" iconType="edit"></Button>
      <Button
        className="icon-only color-white danger"
        iconType="delete"
        value={id}
        onClick={onDelete}
      ></Button>
    </>
  );
  return (
    <div
      className="photosheet-wrapper flex-row selectable position-relative align-items-end hoverable2"
      style={{
        overflow: "hidden",
        backgroundColor: "red",
        maxHeight: "200px",
      }}
    >
      <div
        className="flex-row p-05rem justify-content-right position-absolute top-0 w-100 show-on-hover bg-black-transparent"
        style={{ display: "none" }}
      >
        <Button
          className="icon-only color-white"
          iconType="open_in_full"
        ></Button>
        <Button className="icon-only color-white" iconType="download"></Button>
        {role === ROLE_TYPES.TECHNICAL_PERSON && technicalPersonButtons}
      </div>
      <img className="photosheet" src={sheetURL} alt={description} />
      <div className="photosheet-description bg-black-transparent color-white w-100 text-wrap position-absolute">
        <p className="p-1rem ">{description}</p>
      </div>
    </div>
  );
}
