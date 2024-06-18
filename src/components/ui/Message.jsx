import ErrorIcon from "../icons/ErrorIcon";

export default function Message({ children, isVisible = true }) {
  return (
    <>
      {isVisible && (
        <div className="sam-message">
          <ErrorIcon></ErrorIcon>
          <div>{children}</div>
        </div>
      )}
    </>
  );
}
