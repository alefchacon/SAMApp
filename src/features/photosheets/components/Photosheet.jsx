import Button from "../../../components/ui/Button";

export default function Photosheet({
  imageURL = "src/assets/images/0.webp",
  description = "Descripción de la ficha fotográfica",
}) {
  return (
    <div
      className="photosheet-wrapper flex-row selectable position-relative align-items-end hoverable2"
      style={{
        overflow: "hidden",
        backgroundColor: "red",
      }}
    >
      <div
        className="flex-row p-05rem justify-content-center position-absolute top-0 w-100 show-on-hover"
        style={{ display: "none" }}
      >
        <Button
          className="icon-only color-white"
          iconType="open_in_full"
        ></Button>
        <Button className="icon-only color-white" iconType="download"></Button>
        <Button className="icon-only color-white" iconType="edit"></Button>
        <Button
          className="icon-only color-white danger"
          iconType="delete"
        ></Button>
      </div>
      <img className="photosheet" src={imageURL} alt={description} />
      <p className="photosheet-description bg-black-transparent color-white w-100 text-wrap position-absolute">
        <p className="p-1rem ">{description}</p>
      </p>
    </div>
  );
}
