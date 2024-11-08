import React, { useRef, useEffect, useState } from "react";

export default function EditableDropdownCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
  children,
}) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (values) => {
    try {
      table?.options.meta?.updateData(row.index, path, values[column.id]);
      values.id = databaseTableId;
      onUpdate(values);
    } catch (error) {
      //
    } finally {
      setEditing(false);
    }
  };

  const selected = children.find((child) => child.props.value === initialValue);

  if (editing) {
    return (
      <div
        ref={divRef}
        className="flex-row align-items-center w-100"
        autoComplete="off"
      >
        <select
          value={initialValue}
          type="select"
          onChange={(e) => {
            handleSubmit({ [column.id]: e.target.value });
          }}
        >
          {children}
        </select>
      </div>
    );
  }

  return (
    <div
      onDoubleClick={() => setEditing(true)}
      className="w-100 h-100"
      style={{ position: "relative", zIndex: 9000 }}
    >
      {selected}
    </div>
  );
}
