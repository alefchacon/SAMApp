// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import proj4 from "proj4";

// CUSTOM COMPONENTS
import TextField from "../../../components/ui/TextField";
import LoadingTextField from "../../../components/ui/LoadingTextField";
import Button from "../../../components/ui/Button";

// API CALLS
import { getElevation } from "../businessLogic/external/getElevation";

import { getLocation } from "../businessLogic/external/getLocation";
//VALIDATION SCHEMAS
import { specimenSchema } from "../formikSchemas/specimenSchema";

export default function LocationForm({
  children,
  initialValues,
  handleChange,
  errors = [],
  values,
  onBlur,
  touched,
  setFieldValue,
  inputWidth = "",
}) {
  console.log(touched);
  return (
    <div>
      <Form>
        <div className="input-group">
          <h3>Coordenadas cartesianas</h3>

          <TextField
            label={"Coordenada X"}
            id="coordinates_cartesian_plane_x"
            name="coordinates_cartesian_plane_x"
            errorMessage={errors.coordinates_cartesian_plane_x}
            onChange={handleChange}
            value={values.coordinates_cartesian_plane_x}
            onBlur={onBlur}
            hasError={
              errors.coordinates_cartesian_plane_x &&
              touched.coordinates_cartesian_plane_x
            }
            required
            isFormik
            type="number"
          ></TextField>
          <TextField
            id="coordinates_cartesian_plane_y"
            name="coordinates_cartesian_plane_y"
            onChange={handleChange}
            value={values.coordinates_cartesian_plane_y}
            errorMessage={errors.coordinates_cartesian_plane_y}
            onBlur={onBlur}
            hasError={
              errors.coordinates_cartesian_plane_y &&
              touched.coordinates_cartesian_plane_y
            }
            label={"Coordenada Y"}
            required
            isFormik
            type="number"
          ></TextField>
          <TextField
            label={"Región UTM"}
            id="utm_region"
            name="utm_region"
            onChange={handleChange}
            value={values.utm_region}
            onBlur={onBlur}
            errorMessage={errors.utm_region}
            hasError={Boolean(errors.utm_region && touched.utm_region)}
            maxLength={4}
            required
            isFormik
          ></TextField>
        </div>
        <hr />
        <div className="input-group">
          <h3>Coordenadas geográficas</h3>
          <TextField
            label={"Coordenada Y (Latitud)"}
            id="geographical_coordinates_y"
            name="geographical_coordinates_y"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.geographical_coordinates_y}
            errorMessage={errors.geographical_coordinates_y}
            hasError={Boolean(
              errors.geographical_coordinates_y &&
                touched.geographical_coordinates_y
            )}
            required
            isFormik
            type="number"
          ></TextField>
          <TextField
            label={"Coordenada X (Longitud)"}
            id="geographical_coordinates_x"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.geographical_coordinates_x}
            name="geographical_coordinates_x"
            errorMessage={errors.geographical_coordinates_x}
            hasError={Boolean(
              errors.geographical_coordinates_x &&
                touched.geographical_coordinates_x
            )}
            required
            isFormik
            type="number"
          ></TextField>
        </div>
        <hr />
        <div className="input-group">
          <h3>Elevación</h3>
          <TextField
            label={"Metros a nivel del mar"}
            id="msnm_google"
            name="msnm_google"
            type="number"
            step={1}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.msnm_google}
            errorMessage={errors.msnm_google}
            hasError={Boolean(errors.msnm_google && touched.msnm_google)}
            required
            isFormik
          ></TextField>
          <TextField
            label={"Altitud"}
            id="altitude"
            name="altitude"
            type="number"
            step={1}
            onChange={handleChange}
            onBlur={onBlur}
            value={values.altitude}
            errorMessage={errors.altitude}
            hasError={Boolean(errors.altitude && touched.altitude)}
            required
            isFormik
          ></TextField>
        </div>
        <hr />
        <div className="input-group">
          <h3>Región</h3>
          <TextField
            label={"País"}
            id="country"
            name="country"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.country}
            errorMessage={errors.country}
            hasError={Boolean(errors.country && touched.country)}
            maxLength={100}
            isFormik
            required
          ></TextField>
          <TextField
            label={"Estado"}
            id="state"
            name="state"
            onBlur={onBlur}
            onChange={handleChange}
            value={values.state}
            errorMessage={errors.state}
            hasError={Boolean(errors.state && touched.state)}
            maxLength={100}
            isFormik
            required
          ></TextField>
          <TextField
            label={"Municipio"}
            id="municipality"
            name="municipality"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.municipality}
            errorMessage={errors.municipality}
            hasError={Boolean(errors.municipality && touched.municipality)}
            maxLength={100}
            isFormik
            required
          ></TextField>
          <TextField
            label={"Lugar específico"}
            id="specific_location"
            name="specific_location"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.specific_location}
            errorMessage={errors.specific_location}
            hasError={Boolean(errors.specific_location && touched.location)}
            maxLength={100}
            isFormik
            required
          ></TextField>
        </div>
        <hr />
        <div className="input-group">
          <h3>Instituto</h3>

          <TextField
            label={"Nombre del instituto"}
            id="institute"
            name="institute"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.institute}
            errorMessage={errors.institute}
            hasError={Boolean(errors.institute && touched.institute)}
            maxLength={150}
            required
            isFormik
          ></TextField>
          <TextField
            id="institute_code"
            name="institute_code"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.institute_code}
            errorMessage={errors.institute_code}
            hasError={Boolean(errors.institute_code && touched.institute_code)}
            label={"Código del instituto"}
            maxLength={100}
            required
            isFormik
          ></TextField>
        </div>
      </Form>
    </div>
  );
}
