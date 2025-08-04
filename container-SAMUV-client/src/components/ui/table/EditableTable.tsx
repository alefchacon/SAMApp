// LIBRARIES
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnResizeMode,
  ColumnResizeDirection,
  ColumnFiltersState,
  Header,
  Table,
} from "@tanstack/react-table";

// COMPONENTS
import Button from "../ButtonCustom";
// import "../../../app/App.css";
import TableRow, { PinDirection } from "./TableRow";
import Specimen from "@/features/specimens/domain/model/Specimen";

interface IEditableTableProps {
  data: Specimen[];
  defaultColumns: any;
  isTechnicalPerson: boolean;
}
export default function EditableTable({
  data,
  defaultColumns,
  isTechnicalPerson = false,
}: IEditableTableProps) {
  const [columns, setColumns] = useState(() => [...defaultColumns]);
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");
  const [columnResizeDirection, setColumnResizeDirection] =
    useState<ColumnResizeDirection>("ltr");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [tableData, setTableData] = useState(data);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredColumns = columns.filter((col) =>
    data.some((row) => row[col.accessorKey] !== undefined)
  );

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPagination({
      pageIndex: pagination.pageIndex,
      pageSize: Number(event.target.value),
    });
  };

  const setNestedValue = (
    updatedSpecimen: Specimen,
    path: string,
    value: any
  ) => {
    const keys = path.split(".");
    let specimen = updatedSpecimen;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in specimen)) {
        specimen[key] = {};
      }
      specimen = specimen[key];
    }
    specimen[keys[keys.length - 1]] = value;
    console.error(specimen);
  };

  const table = useReactTable({
    data: data,
    columns: columns,
    columnResizeMode,
    columnResizeDirection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
    state: {
      pagination,
      columnFilters,
    },
    /* DEV ONLY: test column sizing
    columnSizing: {
      defaultColumnWidth: "fit",
    },
    */
    defaultColumn: {},
    meta: {
      updateData: (updatedRowIndex, path, value) => {
        setTableData((previousTableData) =>
          previousTableData.map((row, index) => {
            if (index === updatedRowIndex) {
              const updatedRow: Specimen = {
                ...previousTableData[updatedRowIndex],
              };
              setNestedValue(updatedRow, path, value);
              console.error(updatedRow);
              return updatedRow;
            }
            return row;
          })
        );
      },
    },

    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  interface ITableHeaderProps {
    header: Header<Specimen, any>;
    table: Table<Specimen>;
  }
  function TableHeader({ header, table }: ITableHeaderProps) {
    const [filtering, setFiltering] = useState(false);
    const toggleFiltering = () => setFiltering(!filtering);

    return (
      <div
        className="th selectable"
        key={header.id}
        {...{
          colSpan: header.colSpan,
          style: {
            width: header.getSize(),
          },
        }}
      >
        {header.column.getCanFilter() && filtering && (
          <input
            type="text"
            placeholder={`Filtrar ${header.column.id}`}
            // DEV ONLY: TEST FILTER
            value={String(header.column.getFilterValue()) || ""}
            onChange={(e) =>
              header.column.setFilterValue(e.target.value || undefined)
            }
          />
        )}
        {header.isPlaceholder && header.column.getCanPin()
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}

        <div
          {...{
            onDoubleClick: () => header.column.resetSize(),
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
            className: `resizer ${table.options.columnResizeDirection} ${
              header.column.getIsResizing() ? "isResizing" : ""
            }`,
            style: {
              transform:
                columnResizeMode === "onEnd" && header.column.getIsResizing()
                  ? `translateX(${
                      (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                      (table.getState().columnSizingInfo.deltaOffset ?? 0)
                    }px)`
                  : "",
            },
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="table-actions flex flex-row p-05rem align-items-center justify-content-space-between bg-white">
        <div className="table-page-buttons flex-row align-items-center">
          <button
            className="secondary"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          ></button>
          <button
            className="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          ></button>
          <button
            className="secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          ></button>
          <button
            className="secondary"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          ></button>
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
      <div className="flex flex-row">
        <div className="table-wrapper h-100">
          <div
            className="table"
            {...{
              style: {
                //width: table.getCenterTotalSize(),
                height: "100%",
                width: isTechnicalPerson ? "" : "100%",
              },
            }}
          >
            <div className="thead">
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  className="tr"
                  key={headerGroup.id}
                  style={{ display: "flex" }}
                >
                  {/* Left/Center columns */}
                  <div style={{ display: "flex", flex: 1 }}>
                    {headerGroup.headers
                      .filter((header) => !header.column.getIsPinned())
                      .map((header, index) => (
                        <TableHeader
                          table={table}
                          header={header}
                          key={index}
                        />
                      ))}
                  </div>

                  {/* Right pinned columns */}
                  <div className="flex sticky right-0 z-1 bg-gray-50">
                    {headerGroup.headers
                      .filter(
                        (header) => header.column.getIsPinned() === "right"
                      )
                      .map((header, index) => (
                        <TableHeader
                          table={table}
                          header={header}
                          key={index}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="tbody">
              {table.getRowModel().rows.map((row, index) => {
                return (
                  <div
                    key={row.id}
                    className="tr selectable position-relative"
                    style={{ display: "flex" }}
                  >
                    {/* Left/Center cells */}
                    <div style={{ display: "flex", flex: 1 }}>
                      {row
                        .getVisibleCells()
                        .filter((cell) => !cell.column.getIsPinned())
                        .map((cell) => (
                          <div
                            className="td position-relative"
                            key={cell.id}
                            style={{
                              width: cell.column.getSize(),
                              position: "relative",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ))}
                    </div>

                    {/* Right pinned cells */}
                    <div className="flex sticky right-0 z-1 bg-white shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
                      {row
                        .getVisibleCells()
                        .filter((cell) => {
                          return cell.column.getIsPinned() === "right";
                        })
                        .map((cell) => {
                          return (
                            <div
                              className="td"
                              key={cell.id}
                              style={{
                                width: cell.column.getSize(),
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
