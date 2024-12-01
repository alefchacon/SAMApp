import React, { useRef, useEffect, useState } from "react";

import ButtonIcon from "../ButtonIcon";
import Tooltip from "../Tooltip";
import TextField from "../TextField";
import { Formik, Form, useFormikContext } from "formik";
import { getPartialSchema } from "../../../validation/formikSchemas/schemaUtils";
import { locationSchema } from "../../../features/specimens/formikSchemas/locationSchema";
import Dropdown from "../Dropdown";
import StaticCell from "./StaticCell,";

export default function EditableInputCell({
  domainObject,
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
  validationSchema,
  type = "text",
  max,
}) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef(null);
  const [updated, setUpdated] = useState(false);

  //-------
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setEditing(false);
    }
  };

  if (editing){
    document.body.classList.remove("no-select");
  }

  const enableEditing = () => {
    document.body.classList.add("no-select");
    setEditing(true);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (values) => {
    try {
      table?.options.meta?.updateData(row.index, path, values[column.id]);
      values.id = databaseTableId;
      onUpdate(values);
    } catch (error) {
      //
    } finally {
      setEditing(false);
    }
  };

  //----

  function UpdateListener({ onUpdate }) {
    const { values } = useFormikContext();
    useEffect(() => {
      onUpdate(values[column.id] !== initialValue);
    });
  }

  if (editing) {
    return (
      <Formik
        initialValues={{ [column.id]: initialValue }}
        validationSchema={getPartialSchema(validationSchema, [column.id])}
        onSubmit={handleSubmit}
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
            className="flex-row align-items-center"
            autoComplete="off"
            style={{flex: 1, minWidth: "0px"}}
          >
            <TextField
              id={column.id}
              name={column.id}
              errorMessage={errors[column.id]}
              onChange={handleChange}
              value={values[column.id]}
              onBlur={handleBlur}
              hasError={errors[column.id] && touched[column.id]}
              required
              type={type}
              isFormik
              max={max}
            />
            <ButtonIcon
              iconType={"close"}
              tooltip={"Cancelar"}
              onClick={() => setEditing(false)}
            ></ButtonIcon>
            <ButtonIcon
              isDisabled={!updated}
              iconType={"check"}
              tooltip={"Guardar"}
              type={"submit"}
            ></ButtonIcon>
            <UpdateListener onUpdate={setUpdated}></UpdateListener>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <StaticCell onDoubleClick={enableEditing}>
      {initialValue}
    </StaticCell>
  );
}
