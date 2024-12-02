// LIBRARIES
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

// COMPONENTS
import Button from "../Button";
import "../../../app/App.css";
import ButtonIcon from "../ButtonIcon";
import TableRow from "./TableRow";

export default function EditableTable({ 
  data, 
  onEdit, 
  defaultColumns, 
  isTechnicalPerson = false
}) {
  const [columns, setColumns] = useState(() => [...defaultColumns]);
  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");
  const [columnFilters, setColumnFilters] = useState([]);

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

  const [tableData, setTableData] = useState(data);

  function setNestedValue(updatedRow, path, value) {
    const keys = path.split(".");
    let current = updatedRow;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
  }

  const table = useReactTable({
    data: tableData,
    columns: filteredColumns,
    columnResizeMode,
    columnResizeDirection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnFilters,
    },
    columnSizing: {
      defaultColumnWidth: "fit",
    },
    defaultColumn: {},
    meta: {
      updateData: (updatedRowIndex, path, value) => {
        setTableData((previousTableData) =>
          previousTableData.map((row, index) => {
            if (index === updatedRowIndex) {
              const updatedRow = { ...previousTableData[updatedRowIndex] };
              setNestedValue(updatedRow, path, value);
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

  function TableHeader({ header, table }) {
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
            value={header.column.getFilterValue() || ""}
            onChange={(e) =>
              header.column.setFilterValue(e.target.value || undefined)
            }
          />
        )}
        {header.isPlaceholder
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
        <div className="header-buttons flex-row">
          <ButtonIcon
            iconType={"filter_alt"}
            tooltip={"Filtrar"}
            onClick={toggleFiltering}
          ></ButtonIcon>
          <ButtonIcon iconType={"swap_vert"} tooltip={"Ordenar"}></ButtonIcon>
        </div>
      </div>
    );
  }

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
      >
        <div
          className="table"
          {...{
            style: {
              //width: table.getCenterTotalSize(),
              height: "100%",
              width: isTechnicalPerson ? "" : "100%"
            },
          }}
        >
          <div className="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <div className="tr" key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHeader table={table} header={header} key={index} />
                ))}
              </div>
            ))}
          </div>

          <div className="tbody">
            {table.getRowModel().rows.map((row, index) => (
              <TableRow key={index} rowData={row} onEdit={onEdit} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
