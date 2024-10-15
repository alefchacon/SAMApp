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
      <div className="input-group">
        <h3>Coordenadas cartesianas</h3>
        <div className="grid-2column">
          <TextField
            label={"UTM X"}
            id="location.coordinates_cartesian_plane_x"
            name="location.coordinates_cartesian_plane_x"
            errorMessage={errors.location?.coordinates_cartesian_plane_x}
            onChange={handleChange}
            value={values.location.coordinates_cartesian_plane_x}
            onBlur={onBlur}
            hasError={
              errors.location?.coordinates_cartesian_plane_x &&
              touched.location?.coordinates_cartesian_plane_x
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
            errorMessage={errors.location?.coordinates_cartesian_plane_y}
            onBlur={onBlur}
            hasError={
              errors.location?.coordinates_cartesian_plane_y &&
              touched.location?.coordinates_cartesian_plane_y
            }
            label={"UTM Y"}
            required
            isFormik
            type="number"
          ></TextField>
        </div>
        <div className="grid-2column">
          <TextField
            label={"Región UTM"}
            id="location.utm_region"
            name="location.utm_region"
            onChange={handleChange}
            value={values.location.utm_region}
            onBlur={onBlur}
            errorMessage={errors.location?.utm_region}
            hasError={Boolean(
              errors.location?.utm_region && touched.location?.utm_region
            )}
            maxLength={4}
            required
            isFormik
          ></TextField>
        </div>
      </div>
      <div className="input-group">
        <h3>Coordenadas geográficas</h3>
        <div className="grid-2column">
          <TextField
            label={"Latitud (LN)"}
            id="location.geographical_coordinates_y"
            name="location.geographical_coordinates_y"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.geographical_coordinates_y}
            errorMessage={errors.location?.geographical_coordinates_y}
            hasError={Boolean(
              errors.location?.geographical_coordinates_y &&
                touched.location?.geographical_coordinates_y
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
            errorMessage={errors.location?.geographical_coordinates_x}
            hasError={Boolean(
              errors.location?.geographical_coordinates_x &&
                touched.location?.geographical_coordinates_x
            )}
            required
            isFormik
            type="number"
          ></TextField>
        </div>
      </div>
      <div className="input-group">
        <h3>Elevación</h3>
        <div className="grid-2column">
          <TextField
            label={"Metros a nivel del mar"}
            id="location.msnm_google"
            name="location.msnm_google"
            type="number"
            step={1}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.location.msnm_google}
            errorMessage={errors.location?.msnm_google}
            hasError={Boolean(
              errors.location?.msnm_google && touched.location?.msnm_google
            )}
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
            errorMessage={errors.location?.altitude}
            hasError={Boolean(
              errors.location?.altitude && touched.location?.altitude
            )}
            required
            isFormik
          ></TextField>
        </div>
      </div>
      <div className="input-group">
        <h3>Región</h3>
        <div className="grid-3column">
          <TextField
            label={"País"}
            id="location.country"
            name="location.country"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.country}
            errorMessage={errors.location?.country}
            hasError={Boolean(
              errors.location?.country && touched.location?.country
            )}
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
            errorMessage={errors.location?.state}
            hasError={Boolean(
              errors.location?.state && touched.location?.state
            )}
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
            errorMessage={errors.location?.municipality}
            hasError={Boolean(
              errors.location?.municipality && touched.location?.municipality
            )}
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
            errorMessage={errors.location?.specific_location}
            hasError={Boolean(
              errors.location?.specific_location &&
                touched.location?.specific_location
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
            errorMessage={errors.location?.kilometer}
            hasError={Boolean(
              errors.location?.kilometer && touched.location?.kilometer
            )}
            maxLength={100}
            isFormik
          ></TextField>
        </div>
      </div>
      <div className="input-group">
        <h3>Instituto</h3>
        <TextField
          label={"Nombre del instituto"}
          id="location.institute"
          name="location.institute"
          onChange={handleChange}
          onBlur={onBlur}
          value={values.location.institute}
          errorMessage={errors.location?.institute}
          hasError={Boolean(
            errors.location?.institute && touched.location?.institute
          )}
          maxLength={150}
          required
          isFormik
        ></TextField>
        <div className="grid-2column">
          <TextField
            id="location.institute_code"
            name="location.institute_code"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.location.institute_code}
            errorMessage={errors.location?.institute_code}
            hasError={Boolean(
              errors.location?.institute_code &&
                touched.location?.institute_code
            )}
            label={"Código del instituto"}
            maxLength={100}
            required
            isFormik
          ></TextField>
          <TextField
            label={"Código de la colección"}
            required
            isFormik
            name="colection_code"
            value={values.colection_code}
            onChange={handleChange}
            hasError={errors.colection_code && touched.colection_code}
            errorMessage={errors.colection_code}
            maxWidth={inputWidth}
            onBlur={onBlur}
            maxLength={20}
          ></TextField>
        </div>
      </div>
    </div>
  );
}
