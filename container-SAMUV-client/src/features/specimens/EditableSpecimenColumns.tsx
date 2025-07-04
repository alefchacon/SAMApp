import React from "react";
import EditableInputCell from "../../components/ui/table/EditableInputCell";
import EditableSelectCell from "@/components/ui/table/EditableSelectCell";
import EditableContributorCell from "../contributors/components/EditableContributorCell";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { useSpecimens } from "./businessLogic/useSpecimens";
import { useLocations } from "./businessLogic/useLocations";
import useContributorsAndRoles from "../contributors/businessLogic/useContributorsAndRoles";
import { specimenSchema } from "./formikSchemas/specimenSchema";
import { locationSchema } from "./formikSchemas/locationSchema";
import NATURE from "../../stores/nature";
import moment from "moment";
import { EReproductiveStatus } from "./domain/enum/EReproductiveStatus";
import { EAge } from "./domain/enum/EAge";
import { ESex } from "./domain/enum/ESex";
import { EContriubutorRoles } from "@/stores/EContributorRoles";
import Specimen from "./domain/model/Specimen";

const columnHelper = createColumnHelper<Specimen>();

const editableSpecimenColumns: ColumnDef<Specimen, any>[] = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    id: "geographical_coordinates_x",
    header: () => "LW",
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        path={`location.geographical_coordinates_x`}
        initialValue={info.getValue()?.geographical_coordinates_x}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location!.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // DEV ONLY: fix the frigin schema
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "geographical_coordinates_y",
    header: () => "LN",
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        path={`location.geographical_coordinates_y`}
        initialValue={info.getValue()?.geographical_coordinates_y}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location!.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "coordinates_cartesian_plane_x",
    header: () => "UTM X",

    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        path={`location.coordinates_cartesian_plane_x`}
        initialValue={info.getValue()?.coordinates_cartesian_plane_x}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location!.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "coordinates_cartesian_plane_y",
    header: () => "UTM Y",
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        path={`location.coordinates_cartesian_plane_y`}
        initialValue={info.getValue()?.coordinates_cartesian_plane_y}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location!.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("sex", {
    header: () => "Sexo",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableSelectCell
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"sex"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
      >
        <option value={ESex.FEMALE}>Hembra</option>
        <option value={ESex.MALE}>Macho</option>
        <option value={ESex.ND}>ND</option>
      </EditableSelectCell>
    ),
  }),
  columnHelper.accessor("class_age", {
    header: () => "Edad",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableSelectCell
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"class_age"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
      >
        <option value={EAge.JUVENILE}>{EAge.JUVENILE}</option>
        <option value={EAge.ADULT}>{EAge.ADULT}</option>
        <option value={EAge.SUBADULT}>{EAge.SUBADULT}</option>
        <option value={EAge.BREASTFEEDING}>{EAge.BREASTFEEDING}</option>
        <option value={EAge.ND}>{EAge.ND}</option>
      </EditableSelectCell>
    ),
  }),
  columnHelper.accessor("length_total", {
    header: () => "Longitud",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"length_total"}
        // validationSchema={specimenSchema}
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
      <EditableInputCell
        step={0.001}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"length_tail"}
        // validationSchema={specimenSchema}
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
      <EditableInputCell
        step={0.001}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"length_paw"}
        // validationSchema={specimenSchema}
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
      <EditableInputCell
        step={0.001}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"length_ear"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
      />
    ),
  }),
  columnHelper.accessor("weight", {
    header: () => "Peso",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"weight"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
      />
    ),
  }),
  columnHelper.accessor("reproductive_status", {
    header: () => "Estado reproductivo",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableSelectCell
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"reproductive_status"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
      >
        <option value={EReproductiveStatus.ACTIVE}>
          {EReproductiveStatus.ACTIVE}
        </option>
        <option value={EReproductiveStatus.INACTIVE}>
          {EReproductiveStatus.INACTIVE}
        </option>
        <option value={EReproductiveStatus.LACTANT}>
          {EReproductiveStatus.LACTANT}
        </option>
        <option value={EReproductiveStatus.POSTLACTANT}>
          {EReproductiveStatus.POSTLACTANT}
        </option>
        <option
          value={EReproductiveStatus.TE}
        >{`${EReproductiveStatus.TE} (Testículos escrotados)`}</option>
        <option value={"ND"}>{"ND (No definido)"}</option>
      </EditableSelectCell>
    ),
  }),
  columnHelper.accessor("number_embryos", {
    header: () => "Embriones",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"number_embryos"}
        // validationSchema={specimenSchema}
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
      <EditableInputCell
        path={`location.country`}
        initialValue={info.getValue()?.country || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "state",
    header: () => "Estado",
    cell: (info) => (
      <EditableInputCell
        path={`location.state`}
        initialValue={info.getValue()?.state || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "municipality",
    header: () => "Municipio",
    cell: (info) => (
      <EditableInputCell
        path={`location.municipality`}
        initialValue={info.getValue()?.municipality || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "specific_location",
    header: () => "Localidad específica",
    cell: (info) => (
      <EditableInputCell
        path={`location.specific_location`}
        initialValue={info.getValue()?.specific_location || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "kilometer",
    header: () => "Kilómetro",
    cell: (info) => (
      <EditableInputCell
        path={`location.kilometer`}
        initialValue={info.getValue()?.kilometer || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),

  columnHelper.accessor("location", {
    id: "institute",
    header: () => "Instituto",
    cell: (info) => (
      <EditableInputCell
        path={`location.institute`}
        initialValue={info.getValue()?.institute || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "institute_code",
    header: () => "Código del Instituto",
    cell: (info) => (
      <EditableInputCell
        path={`location.institute_code`}
        initialValue={info.getValue()?.institute_code || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),

  columnHelper.accessor("colection_code", {
    header: () => "Código de la colección",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableInputCell
        path={`colection_code`}
        initialValue={info.getValue() || "N/A"}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "utm_region",
    header: () => "UTM",
    cell: (info) => (
      <EditableInputCell
        maxLength={4}
        path={`location.utm_region`}
        initialValue={info.getValue()?.utm_region || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "msnm_google",
    header: () => "MSNM Google",
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        path={`location.msnm_google`}
        initialValue={info.getValue()?.msnm_google || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("location", {
    id: "altitude",
    header: () => "Altitud",
    cell: (info) => (
      <EditableInputCell
        step={0.001}
        type="number"
        path={`location.altitude`}
        initialValue={info.getValue()?.altitude || "N/A"}
        onUpdate={useLocations().updateLocation}
        databaseTableId={info.row.original.location?.id}
        table={info.table}
        row={info.row}
        column={info.column}
        // validationSchema={locationSchema}
      />
    ),
  }),
  columnHelper.accessor("colection_date", {
    header: () => "Fecha de la colecta",
    footer: (info) => info.column.id,
    cell: (info) => (
      <EditableInputCell
        type="date"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"colection_date"}
        max={moment().format("YYYY-MM-DD")}
        // validationSchema={specimenSchema}
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
      <EditableSelectCell
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"nature"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
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
        <option value={NATURE.ND}>ND (No definido)</option>
      </EditableSelectCell>
    ),
  }),
  columnHelper.accessor("colector", {
    id: "colector",
    header: "Colector",
    cell: (info) => (
      <EditableContributorCell
        path={`colector`}
        initialValue={info.getValue()}
        row={info.row}
        column={info.column}
        table={info.table}
        onUpdate={useContributorsAndRoles().updateContributorSpecimen}
        // roleId={EContriubutorRoles.COLECTOR}
        databaseTableId={info.row.original.colector?.id}
      />
    ),
  }),
  columnHelper.accessor("colector", {
    id: "colector-name",
    header: "Nombre del Colector",
    cell: (info) => {
      return info.getValue()?.name || "N/A";
    },
  }),
  columnHelper.accessor("preparator", {
    id: "preparator",
    header: "Preparador",
    cell: (info) => (
      <EditableContributorCell
        path={`preparator`}
        initialValue={info.getValue()}
        row={info.row}
        column={info.column}
        table={info.table}
        onUpdate={useContributorsAndRoles().updateContributorSpecimen}
        // roleId={EContriubutorRoles.COLECTOR}
        databaseTableId={info.row.original.colector?.id}
      />
    ),
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
      <EditableInputCell
        step={1}
        type="number"
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"colection_number"}
        // validationSchema={specimenSchema}
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
      <EditableInputCell
        initialValue={info.getValue()}
        onUpdate={useSpecimens().updateSpecimen}
        databaseTableId={info.row.original.id}
        path={"comment"}
        // validationSchema={specimenSchema}
        table={info.table}
        row={info.row}
        column={info.column}
      />
    ),
  }),
];

export default editableSpecimenColumns;
