// LIBRARIES
import { flexRender } from "@tanstack/react-table";

// COMPONENTS
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import "../../../app/App.css";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";

export default function TableRow({ rowData }) {

  return (
    <div
      key={rowData.id}
      className="tr selectable position-relative overflow-hidden position-relative"
    >
      {rowData.getVisibleCells().map((cell) => (
        <div
          className="td hoverable2"
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

