import Button from "./Button";

export default function ButtonIcon({
  white,
  iconType,
  onClick,
  type,
  isDisabled,
}) {
  return (
    <Button
      isDisabled={isDisabled}
      className={`icon-only ${white ? "color-white" : ""}`}
      iconType={iconType}
      onClick={onClick}
      type={type}
    ></Button>
  );
}
