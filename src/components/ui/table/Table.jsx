// LIBRARIES
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

// COMPONENTS
import Button from "../Button";
import HoverableActions from "../HoverableActions";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import updateSpecimen from "../../../features/specimens/businessLogic/updateSpecimen";
import "../../../app/App.css";
import ROUTES from "../../../stores/routes";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useLocations } from "../../../features/specimens/businessLogic/useLocations";
import updateLocation from "../../../features/specimens/businessLogic/updateLocation";
import ChipSex from "../../../features/specimens/ChipSex";
import ButtonIcon from "../ButtonIcon";
const columnHelper = createColumnHelper();
import EditableTextCell from "./EditableTextCell";
import EditableDropdownCell from "./EditableDropdownCell";
import EditableDateCell from "./EditableDateCell";
import { specimenSchema } from "../../../features/specimens/formikSchemas/specimenSchema";
import { locationSchema } from "../../../features/specimens/formikSchemas/locationSchema";
import SEX from "../../../stores/sex";
import AGE from "../../../stores/age";
import NATURE from "../../../stores/nature";
import moment from "moment";
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
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

export default function Table({ data, onEdit }) {
  const defaultColumns = [
    columnHelper.accessor("id", {
      header: () => "ID",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("location", {
      id: "geographical_coordinates_x",
      header: () => "LW",
      cell: (info) => (
        <EditableTextCell
          path={`location.geographical_coordinates_x`}
          initialValue={info.getValue()?.geographical_coordinates_x}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "geographical_coordinates_y",
      header: () => "LN",
      cell: (info) => (
        <EditableTextCell
          path={`location.geographical_coordinates_y`}
          initialValue={info.getValue()?.geographical_coordinates_y}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "coordinates_cartesian_plane_x",
      header: () => "UTM X",

      cell: (info) => (
        <EditableTextCell
          path={`location.coordinates_cartesian_plane_x`}
          initialValue={info.getValue()?.coordinates_cartesian_plane_x}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "coordinates_cartesian_plane_y",
      header: () => "UTM Y",
      cell: (info) => (
        <EditableTextCell
          path={`location.coordinates_cartesian_plane_y`}
          initialValue={info.getValue()?.coordinates_cartesian_plane_y}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("sex", {
      header: () => "Sexo",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableDropdownCell
          initialValue={info.getValue()}
          type="select"
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"sex"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
          options
        >
          <option value={SEX.FEMALE}>Hembra</option>
          <option value={SEX.MALE}>Macho</option>
          <option value={SEX.ND}>ND</option>
        </EditableDropdownCell>
      ),
    }),
    columnHelper.accessor("class_age", {
      header: () => "Edad",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableDropdownCell
          initialValue={info.getValue()}
          type="select"
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"class_age"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
          options
        >
          <option value={AGE.JUVENILE}>{AGE.JUVENILE}</option>
          <option value={AGE.ADULT}>{AGE.ADULT}</option>
          <option value={AGE.SUBADULT}>{AGE.SUBADULT}</option>
          <option value={AGE.BREASTFEEDING}>{AGE.BREASTFEEDING}</option>
          <option value={AGE.ND}>{AGE.ND}</option>
        </EditableDropdownCell>
      ),
    }),
    columnHelper.accessor("length_total", {
      header: () => "Longitud",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"length_total"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("length_tail", {
      header: () => "Longitud de cola",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"length_tail"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("length_paw", {
      header: () => "Longitud de pata",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"length_paw"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("length_ear", {
      header: () => "Longitud de oreja",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"length_ear"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("weight", {
      header: () => "Peso",
      footer: (info) => info.column.id,
      //cell: (info) => info.getValue(),
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"weight"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("number_embryos", {
      header: () => "Embriones",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"number_embryos"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "country",
      header: () => "País",
      cell: (info) => (
        <EditableTextCell
          path={`location.country`}
          initialValue={info.getValue()?.country || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "state",
      header: () => "Estado",
      cell: (info) => (
        <EditableTextCell
          path={`location.state`}
          initialValue={info.getValue()?.state || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "municipality",
      header: () => "Municipio",
      cell: (info) => (
        <EditableTextCell
          path={`location.municipality`}
          initialValue={info.getValue()?.municipality || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "specific_location",
      header: () => "Localidad específica",
      cell: (info) => (
        <EditableTextCell
          path={`location.specific_location`}
          initialValue={info.getValue()?.specific_location || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "kilometer",
      header: () => "Kilómetro",
      cell: (info) => (
        <EditableTextCell
          path={`location.kilometer`}
          initialValue={info.getValue()?.kilometer || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),

    columnHelper.accessor("location", {
      id: "institute",
      header: () => "Instituto",
      cell: (info) => (
        <EditableTextCell
          path={`location.institute`}
          initialValue={info.getValue()?.institute || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "institute_code",
      header: () => "Código del Instituto",
      cell: (info) => (
        <EditableTextCell
          path={`location.institute_code`}
          initialValue={info.getValue()?.institute_code || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),

    columnHelper.accessor("colection_code", {
      header: () => "Código de la colección",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          path={`colection_code`}
          initialValue={info.getValue() || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "utm_region",
      header: () => "UTM",
      cell: (info) => (
        <EditableTextCell
          path={`location.utm_region`}
          initialValue={info.getValue()?.utm_region || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "msnm_google",
      header: () => "MSNM Google",
      cell: (info) => (
        <EditableTextCell
          path={`location.msnm_google`}
          initialValue={info.getValue()?.msnm_google || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("location", {
      id: "altitude",
      header: () => "Altitud",
      cell: (info) => (
        <EditableTextCell
          path={`location.altitude`}
          initialValue={info.getValue()?.altitude || "N/A"}
          onUpdate={updateLocation}
          databaseTableId={info.row.original.location.id}
          table={info.table}
          row={info.row}
          column={info.column}
          validationSchema={locationSchema}
        />
      ),
    }),
    columnHelper.accessor("colection_date", {
      header: () => "Fecha de la colecta",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableDateCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"colection_date"}
          max={moment().format("YYYY-MM-DD")}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("nature", {
      header: () => "Naturaleza",
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableDropdownCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"nature"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
          options
        >
          <option value={NATURE.PC}>PC (Piel y cráneo)</option>
          <option value={NATURE.EA}>E/A (En alcohol)</option>
          <option value={NATURE.SE}>SE (Sólo esqueleto)</option>
          <option value={NATURE.EP}>EP (Esqueleto postcraneal)</option>
          <option value={NATURE.PE}>PE (Piel y esqueleto)</option>
          <option value={NATURE.CE}>CE (Cráneo, esqueleto y piel)</option>
          <option value={NATURE.CA}>CA (Cráneo y piel en alcohol)</option>
          <option value={NATURE.SC}>SC (Sólo cráneo)</option>
          <option value={NATURE.SP}>SP (Sólo piel)</option>
        </EditableDropdownCell>
      ),
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
      footer: (info) => info.column.id,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"colection_number"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
    columnHelper.accessor("comment", {
      header: () => "Comentario",
      footer: (info) => info.column.id,
      minSize: 500,
      cell: (info) => (
        <EditableTextCell
          initialValue={info.getValue()}
          onUpdate={updateSpecimen}
          databaseTableId={info.row.original.id}
          path={"comment"}
          validationSchema={specimenSchema}
          table={info.table}
          row={info.row}
          column={info.column}
        />
      ),
    }),
  ];

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
        <div className="header-buttons">
          <ButtonIcon
            iconType={"filter_alt"}
            tooltip={"Filtrar"}
            onClick={toggleFiltering}
          ></ButtonIcon>
          <ButtonIcon iconType={"swap_vert"} tooltip={"Ordenar"}></ButtonIcon>
        </div>
      </th>
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
                  <TableHeader table={table} header={header} />
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
