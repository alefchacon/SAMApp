// LIBRARIES
import React from "react";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import Specimen from "@/features/specimens/domain/model/Specimen";

export enum PinDirection {
  left = "left",
  right = "right",
  center = "center",
}

interface ITableRowProps {
  rowData: Row<Specimen>;
  pinDirection: PinDirection;
}
export default function TableRow(props: ITableRowProps) {
  const { rowData } = props;

  const getVisibleCells = (
    pinDirection: PinDirection,
    row: Row<Specimen>
  ): Cell<Specimen, unknown>[] => {
    if (pinDirection === PinDirection.left) {
      return row.getLeftVisibleCells();
    }
    if (pinDirection === PinDirection.right) {
      return row.getRightVisibleCells();
    }

    return row.getCenterVisibleCells();
  };

  return (
    <div
      key={props.rowData.id}
      className="tr selectable position-relative overflow-hidden position-relative"
    >
      {getVisibleCells(props.pinDirection, props.rowData).map((cell) => (
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
