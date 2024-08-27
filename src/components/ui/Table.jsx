// LIBRARIES
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";

// COMPONENTS
import Button from "./Button";
import HoverableActions from "./HoverableActions";
import TextField from "./TextField";

// ICONS
import DeleteIcon from "../icons/DeleteIcon";

// API CALLS
import { getSpecimens } from "../../features/specimens/api/GetSpecimens";

import "../../app/App.css";

const columnHelper = createColumnHelper();

const defaultColumns = [
  columnHelper.accessor("id", {
    header: () => "IDs",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("catalog_id", {
    header: () => "ID del catálogo",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: () => "Estado",
    cell: (info) => (info.getValue() ? "A" : "B"),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_total", {
    header: () => "Longitud",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_ear", {
    header: () => "Longitud de oreja",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_paw", {
    header: () => "Longitud de pata",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_tail", {
    header: () => "Longitud de cola",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("class_age", {
    header: () => "Edad",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("sex", {
    header: () => "SEXO!!!",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("weigth", {
    header: () => "Peso",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("number_embryos", {
    header: () => "Cantidad de embrios",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colection_code", {
    header: () => "Código de recolección",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colection_date", {
    header: () => "Fecha de recolección",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("preparation_date", {
    header: () => "Fecha de preparación",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("hour", {
    header: () => "Hora",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("comment", {
    header: () => "Comentario",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  /*

  {
    accesorKey: "weigth",
    header: "Peso",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accesorKey: "number_embryos",
    header: "Cantidad de embriones",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accesorKey: "colection_code",
    header: "Código de recolección",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accesorKey: "colection_date",
    header: "Fecha de recolección",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accesorKey: "preparation_date",
    header: "Fecha de preparación",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accesorKey: "hour",
    header: "Hora",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accesorKey: "comment",
    header: "Comentario",
    cell: (props) => <p>{props.getValue()}</p>,
  },*/
];

function TableRow({ rowData }) {
  return (
    <>
      <tr key={rowData.id} className="selectable hoverable2">
        {rowData.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            {...{
              style: {
                width: cell.column.getSize(),
              },
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
        <HoverableActions></HoverableActions>
      </tr>
    </>
  );
}

export default function Table({ data }) {
  const [columns] = useState(() => [...defaultColumns]);
  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handlePageSizeChange = (e) => {
    setPagination({
      pageIndex: pagination.pageIndex,
      pageSize: e.target.value,
    });
  };

  const table = useReactTable({
    data: data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <div className="table-wrapper overflow-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="selectable"
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          table.options.columnResizeDirection
                        } ${header.column.getIsResizing() ? "isResizing" : ""}`,
                        style: {
                          transform:
                            columnResizeMode === "onEnd" &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  (table.options.columnResizeDirection === "rtl"
                                    ? -1
                                    : 1) *
                                  (table.getState().columnSizingInfo
                                    .deltaOffset ?? 0)
                                }px)`
                              : "",
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow key={index} rowData={row} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-actions-bottom bg-white position-sticky bottom-0">
        <div className="table-page-buttons">
          <button
            className="sam-button secondary"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"⇤"}
          </button>
          <button
            className="sam-button secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="sam-button secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="sam-button secondary"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="table-page-label">
            <div>Página &nbsp; </div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </div>
        <div className="flex-row justify-content-center align-items-center">
          <label htmlFor="page-size-select">Registros por página:</label>
          <select
            className=""
            name="pets"
            id="page-size-select"
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </>
  );
}
