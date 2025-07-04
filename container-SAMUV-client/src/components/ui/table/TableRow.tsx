// LIBRARIES
import React from "react";
import { flexRender, Row } from "@tanstack/react-table";
import Specimen from "@/features/specimens/domain/model/Specimen";

interface ITableRowProps {
  rowData: Row<Specimen>;
}
export default function TableRow(props: ITableRowProps) {
  const { rowData } = props;

  return (
    <div
      key={props.rowData.id}
      className="tr selectable position-relative overflow-hidden position-relative"
    >
      {rowData.getVisibleCells().map((cell) => (
        <div
          className="td position-relative"
          key={cell.id}
          {...{
            style: {
              width: cell.column.getSize(),
              position: "relative",
            },
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}
