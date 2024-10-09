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
  return (
    <div>
      <Form>
        <div className="input-group">
          <h3>Coordenadas cartesianas</h3>

          <TextField
            label={"UTM X"}
            id="location.coordinates_cartesian_plane_x"
            name="location.coordinates_cartesian_plane_x"
            errorMessage={errors.coordinates_cartesian_plane_x}
            onChange={handleChange}
            value={values.location.coordinates_cartesian_plane_x}
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
            id="location.coordinates_cartesian_plane_y"
            name="location.coordinates_cartesian_plane_y"
            onChange={handleChange}
            value={values.location.coordinates_cartesian_plane_y}
            errorMessage={errors.coordinates_cartesian_plane_y}
            onBlur={onBlur}
            hasError={
              errors.coordinates_cartesian_plane_y &&
              touched.coordinates_cartesian_plane_y
            }
            label={"UTM Y"}
            required
            isFormik
            type="number"
          ></TextField>
          <TextField
            label={"Región UTM"}
            id="location.utm_region"
            name="location.utm_region"
            onChange={handleChange}
            value={values.location.utm_region}
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
            label={"Latitud (LN)"}
            id="location.geographical_coordinates_y"
            name="location.geographical_coordinates_y"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.geographical_coordinates_y}
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
            label={"Longitud (LW)"}
            id="location.geographical_coordinates_x"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.geographical_coordinates_x}
            name="location.geographical_coordinates_x"
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
            id="location.msnm_google"
            name="location.msnm_google"
            type="number"
            step={1}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.location.msnm_google}
            errorMessage={errors.msnm_google}
            hasError={Boolean(errors.msnm_google && touched.msnm_google)}
            required
            isFormik
          ></TextField>
          <TextField
            label={"Altitud"}
            id="location.altitude"
            name="location.altitude"
            type="number"
            step={1}
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.altitude}
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
            id="location.country"
            name="location.country"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.country}
            errorMessage={errors.country}
            hasError={Boolean(errors.country && touched.country)}
            maxLength={100}
            isFormik
            required
          ></TextField>
          <TextField
            label={"Estado"}
            id="location.state"
            name="location.state"
            onBlur={onBlur}
            onChange={handleChange}
            value={values.location.state}
            errorMessage={errors.state}
            hasError={Boolean(errors.state && touched.state)}
            maxLength={100}
            isFormik
            required
          ></TextField>
          <TextField
            label={"Municipio"}
            id="location.municipality"
            name="location.municipality"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.municipality}
            errorMessage={errors.municipality}
            hasError={Boolean(errors.municipality && touched.municipality)}
            maxLength={100}
            isFormik
          ></TextField>
          <TextField
            label={"Lugar específico"}
            id="location.specific_location"
            name="location.specific_location"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.specific_location}
            errorMessage={errors.specific_location}
            hasError={Boolean(
              errors.specific_location && touched.specific_location
            )}
            maxLength={100}
            isFormik
          ></TextField>
          <TextField
            label={"Kilómetro"}
            id="location.kilometer"
            name="location.kilometer"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.kilometer}
            errorMessage={errors.kilometer}
            hasError={Boolean(errors.kilometer && touched.kilometer)}
            maxLength={100}
            isFormik
          ></TextField>
        </div>
        <hr />
        <div className="input-group">
          <h3>Instituto</h3>

          <TextField
            label={"Nombre del instituto"}
            id="location.institute"
            name="location.institute"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.institute}
            errorMessage={errors.institute}
            hasError={Boolean(errors.institute && touched.institute)}
            maxLength={150}
            required
            isFormik
          ></TextField>
          <TextField
            id="location.institute_code"
            name="location.institute_code"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.institute_code}
            errorMessage={errors.institute_code}
            hasError={Boolean(errors.institute_code && touched.institute_code)}
            label={"Código del instituto"}
            maxLength={100}
            required
            isFormik
          ></TextField>
          <TextField
            label={"Código de la colección"}
            required
            isFormik
            name="location.colection_code"
            value={values.colection_code}
            onChange={handleChange}
            hasError={errors.colection_code && touched.colection_code}
            errorMessage={errors.colection_code}
            maxWidth={inputWidth}
            onBlur={onBlur}
            maxLength={20}
          ></TextField>
        </div>
      </Form>
    </div>
  );
}
