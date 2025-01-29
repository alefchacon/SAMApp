import Button from "../Button";

export default function Modal({
  children,
  open = true,
  dismissable = true,
  onClose,
  title,
  width = null,
  maxHeight = null,
}) {
  return (
    <div className={`modal-background  ${open ? "visible" : "invisible"}`}>
      <div
        className="modal-content rounded-5 shadow-all"
        style={{ width: width, maxHeight: maxHeight }}
      >
        <div className="modal-header p-1rem flex-row justify-content-space-between">
          <h2>{title}</h2>
          {dismissable && (
            <Button
              iconType="close"
              className="icon-only"
              onClick={onClose}
            ></Button>
          )}
        </div>
        {open && <div className="modal-body">{children}</div>}
      </div>
    </div>
  );
}
