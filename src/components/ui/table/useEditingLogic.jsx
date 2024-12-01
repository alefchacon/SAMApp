import React, { useRef, useEffect, useState } from "react";

import ButtonIcon from "../ButtonIcon";
import Tooltip from "../Tooltip";
import TextField from "../TextField";
import { Formik, Form, useFormikContext } from "formik";
import { getPartialSchema } from "../../../validation/formikSchemas/schemaUtils";
import { locationSchema } from "../../../features/specimens/formikSchemas/locationSchema";
import Dropdown from "../Dropdown";
import StaticCell from "./StaticCell,";

export default function useEditingLogic({
  path,
  row,
  column,
  table,
  onUpdate,
  databaseTableId,
}) {
  const [editing, setEditing] = useState(false);
  const divRef = useRef(null);

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

  return {editing, setEditing, divRef, handleClickOutside, enableEditing, handleSubmit}
}
