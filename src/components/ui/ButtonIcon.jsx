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
    <Tooltip content={tooltip}>
      <Button
        isDisabled={isDisabled}
        className={`icon-only ${white ? "color-white" : ""}`}
        iconType={iconType}
        onClick={onClick}
        type={type}
      ></Button>
    </Tooltip>
  );
}
