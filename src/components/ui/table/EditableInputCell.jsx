import React, { useRef, useEffect, useState } from "react";

import ButtonIcon from "../ButtonIcon";
import TextField from "../TextField";
import { Formik, Form, useFormikContext } from "formik";
import { getPartialSchema } from "../../../validation/formikSchemas/schemaUtils";
import StaticCell from "./StaticCell,";
import useSession from "../../../features/auth/businessLogic/useSession";
import { ROLE_TYPES } from "../../../stores/roleTypes";




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
  editable = false
}) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef(null);
  const inputRef = useRef(null);
  const formikRef = useRef(null);
  const { getProfile } = useSession();
  const profile = getProfile();
  const isTechnicalPerson = profile.role === ROLE_TYPES.TECHNICAL_PERSON;

  if (editing){
    document.body.classList.remove("no-select");
  }

  const enableEditing = () => {
    if (!isTechnicalPerson){
      return;
    }

    document.body.classList.add("no-select");
    setEditing(true);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleSubmitByClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleSubmitByClickOutside);
    };
  }, []);

  const handleSubmit = async (values) => {
    const errors = await formikRef.current.validateForm();
    if (Object.keys(errors).length > 0) {
      return;
    }
    table?.options.meta?.updateData(row.index, path, values[column.id]);
    values.id = databaseTableId;
    onUpdate(values);
    setEditing(false);  
  };


  const nonFormikValues = () => {
    return {
      [column.id]: inputRef.current.value
    }
  }
  
  const handleSubmitByClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      handleSubmit(nonFormikValues())
    }
  };
  
  const handleKeydown = (event) => {
    if (event.code === "Escape"){
      setEditing(false);
      return;
    }
    if (event.code === "Enter"){
      handleSubmit(nonFormikValues())
      return;
    }
  }

  if (editing) {
    return (
      <Formik
        initialValues={{ [column.id]: initialValue }}
        validationSchema={getPartialSchema(validationSchema, [column.id])}
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
              ref={inputRef}
              onKeydown={handleKeydown}
            />
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
