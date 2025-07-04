import React, { useRef, useEffect, useState } from "react";
import StaticCell from "./StaticCell";
import useSession from "@/features/auth/businessLogic/useSession";
import { Column, Row, Table } from "@tanstack/react-table";
import Specimen from "@/features/specimens/domain/model/Specimen";

interface IEditableSelectCellProps {
  path: string;
  initialValue: any;
  row: Row<any>;
  column: Column<Specimen, any>;
  table: Table<Specimen>;
  onUpdate: (values: any) => void;
  databaseTableId?: number;
  // validationSchema,
  children: React.ReactElement[];
}
export default function EditableSelectCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
  children,
}: IEditableSelectCellProps) {
  const [editing, setEditing] = useState(false);
  const { getProfile } = useSession();
  const profile = getProfile();
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const canDisableEditing =
      divRef.current &&
      event.target instanceof Node &&
      !divRef.current.contains(event.target);

    if (canDisableEditing) {
      setEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (values: any) => {
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

  const selected = children!.find(
    (child) => child!.props.value === initialValue
  );

  if (editing) {
    return (
      <div ref={divRef} className="flex-row align-items-center w-100">
        <select
          value={initialValue}
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
    // DEV ONLY: test editing for tech person only
    if (!profile.isTechnicalPerson()) {
      return;
    }

    setEditing(true);

    /* DEV ONLY: check if this is necessary at all. me thinks it aint.
    if (onEditing) {
      onEditing();
    }
      */
  };

  return <StaticCell onDoubleClick={enableEditing}>{selected}</StaticCell>;
}
