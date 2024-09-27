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
import Card from "./Card";
import Button from "./Button";
import HoverableActions from "./HoverableActions";
import TextField from "./TextField";
import ChipLabel from "./ChipLabel";

// ICONS
import DeleteIcon from "../icons/DeleteIcon";

// API CALLS

import "../../app/App.css";

const columnHelper = createColumnHelper();

const ChipFemale = (
  <ChipLabel
    iconType={"female"}
    color="var(--pink)"
    backgroundColor="var(--light-pink)"
    width="100px"
  >
    Hembra
  </ChipLabel>
);

const ChipMale = (
  <ChipLabel
    width="100px"
    iconType={"male"}
    color="var(--uv-blue)"
    backgroundColor="var(--light-blue)"
  >
    Macho
  </ChipLabel>
);

const defaultColumns = [
  columnHelper.accessor("catalog_id", {
    header: () => "ID del catálogo",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: () => "Estado",
    cell: (info) => (info.getValue() ? "Publicado" : "Dañado"),
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
    header: () => "Sexo",
    cell: (info) => (info.getValue() === "H" ? ChipFemale : ChipMale),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("weigth", {
    header: () => "Peso",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("number_embryos", {
    header: () => "Cantidad de embriones",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colection_date", {
    header: () => "Fecha de recolección",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("hour", {
    header: () => "Hora de colecta",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("comment", {
    header: () => "Comentario",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colector", {
    header: () => "Colector",
    cell: (info) => `${info.getValue().code}`,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colector", {
    header: () => "Colector (nombre)",
    cell: (info) => `${info.getValue().name}`,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colection_code", {
    header: () => "Número de colecta",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("preparator", {
    header: () => "Preparador",
    cell: (info) => info.getValue().code,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("preparator", {
    header: () => "Preparador (nombre)",
    cell: (info) => info.getValue().name,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("preparation_date", {
    header: () => "Fecha de preparación",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "País",
    cell: (info) => info.getValue().country,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Estado",
    cell: (info) => info.getValue().state,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Municipio",
    cell: (info) => info.getValue().municipality,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Localidad específica",
    cell: (info) => info.getValue().specific_location,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Latitud",
    cell: (info) => info.getValue().geographical_coordinates_y,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Longitud",
    cell: (info) => info.getValue().geographical_coordinates_x,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Coordenada cartesiana Y",
    cell: (info) => info.getValue().coordinates_cartesian_plane_y,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Coordenada cartesiana Y",
    cell: (info) => info.getValue().coordinates_cartesian_plane_x,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Región UTM",
    cell: (info) => info.getValue().utm_region,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Metros sobre el nivel del mar",
    cell: (info) => info.getValue().msnm_google,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "ID del instituto",
    cell: (info) => info.getValue().institute_code,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: () => "Instituto",
    cell: (info) => info.getValue().institute,
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

function TableRow({ rowData, onEdit }) {
  return (
    <div className="row-wrapper">
      <div
        key={rowData.id}
        className="tr selectable hoverable2"
        style={{ position: "relative" }}
      >
        <HoverableActions></HoverableActions>
        {rowData.getVisibleCells().map((cell) => (
          <div
            className="td"
            key={cell.id}
            {...{
              style: {
                width: cell.column.getSize(),
              },
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
        {/*
        
        <HoverableActions></HoverableActions>
        */}
      </div>
    </div>
  );
}

export default function Table({ data, onEdit }) {
  const [columns] = useState(() => [...defaultColumns]);
  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  console.log(data);

  const filteredColumns = columns.filter((col) =>
    data.some((row) => row[col.accessorKey] !== undefined)
  );

  const handlePageSizeChange = (e) => {
    setPagination({
      pageIndex: pagination.pageIndex,
      pageSize: e.target.value,
    });
  };

  const table = useReactTable({
    data: data,
    columns: filteredColumns,
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
      <div className="table-actions flex-row p-1rem align-items-center justify-content-space-between bg-white">
        <div className="table-page-buttons flex-row align-items-center">
          <Button
            className="secondary"
            iconType="first_page"
            onClick={() => table.firstPage()}
            isDisabled={!table.getCanPreviousPage()}
          ></Button>
          <Button
            className="secondary"
            iconType="chevron_left"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          ></Button>
          <Button
            className="secondary"
            iconType="chevron_right"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          ></Button>
          <Button
            className="secondary"
            iconType="last_page"
            onClick={() => table.lastPage()}
            isDisabled={!table.getCanNextPage()}
          ></Button>
          <span className="table-page-label">
            <div>Página &nbsp;</div>
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
      <div
        className="table-wrapper"
        style={{ overflow: "scroll", height: "100%" }}
      >
        <table
          className="h-100 table"
          {...{
            style: {
              //width: table.getCenterTotalSize(),
              height: "100%",
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="tr" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="th selectable"
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
              <TableRow key={index} rowData={row} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
