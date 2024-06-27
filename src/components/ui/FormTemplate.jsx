// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import { useSnackbar } from "../contexts/SnackbarContext";

export default function FormTemplate({
  children,
  title = "Título del formulario",
}) {
  const [showModal, setShowModal] = useState(false);
  const { showSnackbar } = useSnackbar();

  return (
    <div>
      <h2 className="form-title">{title}</h2>
      <div className="sam-form">{children}</div>
    </div>
  );
}
