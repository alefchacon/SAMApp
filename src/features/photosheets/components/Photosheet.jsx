import Button from "../../../components/ui/Button";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export default function Photosheet({
  role = ROLE_TYPES.VISITOR,
  imageURL = "src/assets/images/0.webp",
  description = "Descripción de la ficha fotográfica",
  isTechnicalPerson = false,
}) {
  const technicalPersonButtons = (
    <>
      <Button className="icon-only color-white" iconType="edit"></Button>
      <Button
        className="icon-only color-white danger"
        iconType="delete"
      ></Button>
    </>
  );
  return (
    <div
      className="photosheet-wrapper flex-row selectable position-relative align-items-end hoverable2"
      style={{
        overflow: "hidden",
        backgroundColor: "red",
      }}
    >
      <div
        className="flex-row p-05rem justify-content-right position-absolute top-0 w-100 show-on-hover"
        style={{ display: "none" }}
      >
        <Button
          className="icon-only color-white"
          iconType="open_in_full"
        ></Button>
        <Button className="icon-only color-white" iconType="download"></Button>
        {role === ROLE_TYPES.TECHNICAL_PERSON && technicalPersonButtons}
      </div>
      <img className="photosheet" src={imageURL} alt={description} />
      <p className="photosheet-description bg-black-transparent color-white w-100 text-wrap position-absolute">
        <p className="p-1rem ">{description}</p>
      </p>
    </div>
  );
}
