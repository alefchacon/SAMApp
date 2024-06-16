import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { getSpecimens } from "../../features/specimens/api/GetSpecimens";
import Button from "./Button";
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

export default function Table() {
  const [data, setData] = useState({});
  const [columns] = useState(() => [...defaultColumns]);
  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    async function getData() {
      const newData = await getSpecimens(100);
      setData(newData);
      console.log(newData);
    }
    getData();
  }, []);

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
      <div className="table-wrapper">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="selectable" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="selectable">
                {row.getVisibleCells().map((cell) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
      </div>
    </>
  );
}
