import React, { useRef, useEffect, useState } from "react";
import StaticCell from "./StaticCell,";
import useSession from "../../../features/auth/businessLogic/useSession";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export default function EditableSelectCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
  children,
  onEditing,
  editable = false
}) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef(null);
  const { getProfile } = useSession();
  const profile = getProfile();
  const isTechnicalPerson = profile.role === ROLE_TYPES.TECHNICAL_PERSON;

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

  const enableEditing = () => {
    if (!isTechnicalPerson){
      return;
    }

    setEditing(true);
    if (onEditing) {
      onEditing();
    }
  };

  return <StaticCell onDoubleClick={enableEditing}>{selected}</StaticCell>;
}
