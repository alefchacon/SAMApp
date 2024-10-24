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
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

import "../../app/App.css";
import ROUTES from "../../stores/routes";
import { useSpecimens } from "../../features/specimens/businessLogic/useSpecimens";
import ChipSex from "../../features/specimens/ChipSex";

const columnHelper = createColumnHelper();

const defaultColumns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    id: "geographical_coordinates_x",
    header: () => "LW",
    cell: (info) => {
      return info.getValue()?.geographical_coordinates_x || "";
    },
  }),
  columnHelper.accessor("location", {
    id: "geographical_coordinates_y",
    header: () => "LN",
    cell: (info) => {
      return info.getValue()?.geographical_coordinates_y || "";
    },
  }),
  columnHelper.accessor("location", {
    id: "coordinates_cartesian_plane_x",
    header: () => "UTM X",
    cell: (info) => {
      return info.getValue()?.coordinates_cartesian_plane_x || "";
    },
  }),
  columnHelper.accessor("location", {
    id: "coordinates_cartesian_plane_y",
    header: () => "UTM Y",
    cell: (info) => {
      return info.getValue()?.coordinates_cartesian_plane_y || "";
    },
  }),
  columnHelper.accessor("sex", {
    header: () => "Sexo",
    cell: (info) => <ChipSex sex={info.getValue()} />,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("class_age", {
    header: () => "Edad",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_total", {
    header: () => "Longitud",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_tail", {
    header: () => "Longitud de cola",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_paw", {
    header: () => "Longitud de pata",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("length_ear", {
    header: () => "Longitud de oreja",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("weight", {
    header: () => "Peso",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("number_embryos", {
    header: () => "Embriones",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    id: "country",
    header: () => "País",
    cell: (info) => {
      return info.getValue()?.country || "N/A";
    },
  }),
  columnHelper.accessor("location", {
    id: "state",
    header: () => "Estado",
    cell: (info) => {
      return info.getValue()?.state || "N/A";
    },
  }),
  columnHelper.accessor("location", {
    id: "municipality",
    header: () => "Municipio",
    cell: (info) => {
      return info.getValue()?.municipality || "N/A";
    },
  }),
  columnHelper.accessor("location", {
    id: "specific_location",
    header: () => "Localidad específica",
    cell: (info) => {
      return info.getValue()?.specific_location || "N/A";
    },
  }),
  columnHelper.accessor("location", {
    id: "kilometer",
    header: () => "Kilómetro",
    cell: (info) => {
      return info.getValue()?.kilometer || "";
    },
  }),

  columnHelper.accessor("location", {
    id: "institute",
    header: () => "Instituto",
    cell: (info) => {
      return info.getValue()?.institute || "";
    },
  }),
  columnHelper.accessor("location", {
    id: "institute_code",
    header: () => "Código del Instituto",
    cell: (info) => {
      return info.getValue()?.institute_code || "";
    },
  }),

  columnHelper.accessor("colection_code", {
    header: () => "Código de la colección",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    id: "utm_region",
    header: () => "UTM",
    cell: (info) => {
      return info.getValue()?.utm_region || "";
    },
  }),
  columnHelper.accessor("location", {
    id: "msnm_google",
    header: () => "MSNM Google",
    cell: (info) => {
      return info.getValue()?.msnm_google || "";
    },
  }),
  columnHelper.accessor("location", {
    id: "altitude",
    header: () => "Altitud",
    cell: (info) => {
      return info.getValue()?.altitude || "";
    },
  }),
  columnHelper.accessor("colection_date", {
    header: () => "Fecha de la colecta",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("nature", {
    header: () => "Naturaleza",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("colector", {
    id: "colector-code",
    header: "Código de Colector",
    cell: (info) => {
      return info.getValue()?.code || "N/A";
    },
  }),
  columnHelper.accessor("colector", {
    id: "colector-name",
    header: "Nombre del Colector",
    cell: (info) => {
      return info.getValue()?.name || "N/A";
    },
  }),
  columnHelper.accessor("preparator", {
    id: "preparator-code",
    header: "Preparador",
    cell: (info) => {
      return info.getValue()?.code || "N/A";
    },
  }),
  columnHelper.accessor("preparator", {
    id: "preparator-name",
    header: "Nombre del Preparador",
    cell: (info) => {
      return info.getValue()?.name || "N/A";
    },
  }),
  columnHelper.accessor("colection_number", {
    header: () => "Número de colecta",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("comment", {
    header: () => "Comentario",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    minSize: 500, // Minimum width
  }),
];

function TableRow({ rowData, onEdit }) {
  const navigate = useNavigate();
  const { showModal, closeModal } = useModal();
  const { deleteSpecimen } = useSpecimens();
  const handleConfirmDelete = () => {
    const body = (
      <div className="flex-col">
        <p>
          ¿Está seguro de eliminar al espécimen? Esta acción no puede
          deshacerse.
        </p>
        <div className="button-row">
          <Button onClick={closeModal} className="secondary" iconType="close">
            Cancelar
          </Button>
          <Button
            onClick={() => deleteSpecimen(rowData.original.id)}
            className="primary danger"
            iconType="delete"
          >
            Eliminar especímen
          </Button>
        </div>
      </div>
    );

    showModal("Eliminar espécimen", body);
  };

  return (
    <tr
      key={rowData.id}
      className="tr selectable"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {rowData.getVisibleCells().map((cell) => (
        <td
          className="td hoverable2"
          key={cell.id}
          {...{
            style: {
              width: cell.column.getSize(),
              position: "relative",
            },
          }}
        >
          <HoverableActions>
            <Button
              iconType="edit"
              className="icon-only color-white"
              onClick={() =>
                navigate(`${ROUTES.EDIT_SPECIMEN}/${rowData.original.id}`, {
                  state: { specimen: rowData.original },
                })
              }
            ></Button>
            <Button
              iconType="delete"
              className="icon-only color-white danger"
              onClick={handleConfirmDelete}
            ></Button>
          </HoverableActions>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
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
      <div className="table-actions flex-row p-05rem align-items-center justify-content-space-between bg-white">
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
        style={{ overflowX: "scroll", height: "100%" }}
      >
        <table
          {...{
            style: {
              //width: table.getCenterTotalSize(),
              height: "100%",
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <div className="tr" key={headerGroup.id}>
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
              </div>
            ))}
          </thead>

          <tbody style={{ overflow: "hidden" }}>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow key={index} rowData={row} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
