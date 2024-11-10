import Button from "./Button";
import Tooltip from "./Tooltip";

export default function ButtonIcon({
  white,
  iconType,
  tooltip,
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
