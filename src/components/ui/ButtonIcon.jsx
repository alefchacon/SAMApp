import Button from "./Button";

export default function ButtonIcon({
  white,
  iconType,
  onClick,
  type,
  isDisabled,
  className = ""
}) {
  return (
    <Button
      isDisabled={isDisabled}
      className={`${className} icon-only ${white ? "color-white" : ""}`}
      iconType={iconType}
      onClick={onClick}
      type={type}
    ></Button>
  );
}
