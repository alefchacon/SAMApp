import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import TextField from "../TextField";
import ButtonIcon from "../ButtonIcon";
import { getPartialSchema } from "../../../validation/formikSchemas/schemaUtils";
export default function EditableDateCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
  validationSchema,
  children,
  max,
}) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef(null);
  const [updated, setUpdated] = useState(false);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setEditing(false);
    }
  };

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
            className="flex-row align-items-center w-100"
            autoComplete="off"
          >
            <TextField
              type="date"
              id={column.id}
              name={column.id}
              errorMessage={errors[column.id]}
              onChange={handleChange}
              value={values[column.id]}
              onBlur={handleBlur}
              hasError={errors[column.id] && touched[column.id]}
              required
              max={max}
              isFormik
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
    <div
      onDoubleClick={() => setEditing(true)}
      className="w-100 h-100"
      style={{ position: "relative", zIndex: 9000 }}
    >
      {initialValue}
    </div>
  );
}
