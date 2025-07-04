import React, { useRef, useEffect, useState } from "react";
import { Row, Column, Table, TableMeta } from "@tanstack/react-table";
import TextField from "../TextField";
import { Formik, Form, useFormikContext, FormikProps } from "formik";
// DEV ONLY: Figure out what to do with this:
// import { getPartialSchema } from "../../../validation/formikSchemas/schemaUtils";
import StaticCell from "./StaticCell";
import useSession from "../../../features/auth/businessLogic/useSession";
import { UserRoles } from "@/stores/EUserRoles";
import Specimen from "@/features/specimens/domain/model/Specimen";

interface IEditableInputCellProps {
  path: string;
  initialValue: any;
  row: Row<Specimen>;
  column: Column<Specimen, any>;
  table: Table<Specimen>;
  onUpdate: (values: any) => void;
  databaseTableId?: number;
  // validationSchema,
  type?: string;
  max?: number | string;
  maxLength?: number;
  step?: number;
}
export default function EditableInputCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
  // validationSchema,
  type = "text",
  max,
  maxLength,
  step = 1,
}: IEditableInputCellProps) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formikRef = useRef<FormikProps<any>>(null);
  const { getProfile } = useSession();
  const profile = getProfile();
  const isTechnicalPerson = profile.role === UserRoles.TECHNICAL_PERSON;

  if (editing) {
    document.body.classList.remove("no-select");
  }

  const enableEditing = () => {
    if (!isTechnicalPerson) {
      return;
    }

    document.body.classList.add("no-select");
    setEditing(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleSubmitByClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleSubmitByClickOutside);
    };
  }, []);

  const handleSubmit = async (values: any) => {
    if (!formikRef.current) {
      throw new TypeError("An EditableInputCell can't have a null formikRef");
    }

    const errors = await formikRef.current.validateForm();
    if (Object.keys(errors).length > 0) {
      return;
    }

    values.id = databaseTableId;
    try {
      onUpdate(values);
      table?.options.meta?.updateData(row.index, path, values[column.id]);
    } catch (error) {
      //
    }
    setEditing(false);
  };

  const nonFormikValues = () => {
    return {
      [column.id]: inputRef!.current!.value,
    };
  };

  const handleSubmitByClickOutside = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      handleSubmit(nonFormikValues());
    }
  };

  const handleKeydown = (event: any) => {
    if (event.code === "Escape") {
      setEditing(false);
      return;
    }
    if (event.code === "Enter") {
      handleSubmit(nonFormikValues());
      return;
    }
  };

  if (editing) {
    return (
      <Formik
        initialValues={{ [column.id]: initialValue }}
        // validationSchema={getPartialSchema(validationSchema, [column.id])}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({
          values,
          handleBlur,
          handleChange,
          errors,
          touched,
          validateForm,
        }) => (
          <Form
            ref={divRef}
            className="flex-row align-items-center flex-grow-1 minw-0"
            autoComplete="off"
          >
            <TextField
              id={column.id}
              step={step}
              name={column.id}
              errorMessage={errors[column.id] as string}
              onChange={handleChange}
              value={values[column.id]}
              onBlur={handleBlur}
              hasError={Boolean(errors[column.id] && touched[column.id])}
              required
              type={type}
              isFormik
              max={max}
              maxLength={maxLength}
              ref={inputRef}
              onKeydown={handleKeydown}
            />
          </Form>
        )}
      </Formik>
    );
  }

  return <StaticCell onDoubleClick={enableEditing}>{initialValue}</StaticCell>;
}
