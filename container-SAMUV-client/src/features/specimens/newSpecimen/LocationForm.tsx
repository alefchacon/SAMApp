import React from "react";

import TextField from "../../../components/ui/TextField";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { ISpecimen } from "../domain/model/Specimen";
import Location from "../domain/model/Location";

export default function LocationForm({ inputWidth = "" }) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ISpecimen>();

  const locationValues = values.location as Location;
  const locationErrors = errors.location as FormikErrors<Location>;
  const locationTouched = errors.location as FormikTouched<Location>;

  return (
    <div>
      <div className="input-group">
        <h2>Coordenadas cartesianas</h2>
        <TextField
          label={"UTM X"}
          id="location.coordinates_cartesian_plane_x"
          name="location.coordinates_cartesian_plane_x"
          errorMessage={locationErrors?.coordinates_cartesian_plane_x}
          onChange={handleChange}
          value={locationValues.coordinates_cartesian_plane_x}
          onBlur={handleBlur}
          hasError={Boolean(
            locationErrors?.coordinates_cartesian_plane_x &&
              locationTouched?.coordinates_cartesian_plane_x
          )}
          required
          isFormik
          type="number"
        ></TextField>
        <TextField
          id="location.coordinates_cartesian_plane_y"
          name="location.coordinates_cartesian_plane_y"
          onChange={handleChange}
          value={locationValues.coordinates_cartesian_plane_y}
          errorMessage={locationErrors?.coordinates_cartesian_plane_y}
          onBlur={handleBlur}
          hasError={Boolean(
            locationErrors?.coordinates_cartesian_plane_y &&
              locationTouched?.coordinates_cartesian_plane_y
          )}
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
          value={locationValues.utm_region}
          onBlur={handleBlur}
          errorMessage={locationErrors?.utm_region}
          hasError={Boolean(
            locationErrors?.utm_region && locationTouched?.utm_region
          )}
          maxLength={4}
          required
          isFormik
        ></TextField>
      </div>
      <div className="input-group">
        <h2>Coordenadas geográficas</h2>
        <TextField
          label={"Latitud (LN)"}
          id="location.geographical_coordinates_y"
          name="location.geographical_coordinates_y"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.geographical_coordinates_y}
          errorMessage={locationErrors?.geographical_coordinates_y}
          hasError={Boolean(
            locationErrors?.geographical_coordinates_y &&
              locationTouched?.geographical_coordinates_y
          )}
          required
          isFormik
          type="number"
        ></TextField>
        <TextField
          label={"Longitud (LW)"}
          id="location.geographical_coordinates_x"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.geographical_coordinates_x}
          name="location.geographical_coordinates_x"
          errorMessage={locationErrors?.geographical_coordinates_x}
          hasError={Boolean(
            locationErrors?.geographical_coordinates_x &&
              locationTouched?.geographical_coordinates_x
          )}
          required
          isFormik
          type="number"
        ></TextField>
      </div>
      <div className="input-group">
        <h2>Elevación</h2>
        <TextField
          label={"MSNM Google"}
          id="location.msnm_google"
          name="location.msnm_google"
          type="number"
          step={1}
          onBlur={handleBlur}
          onChange={handleChange}
          value={locationValues.msnm_google}
          errorMessage={locationErrors?.msnm_google}
          hasError={Boolean(
            locationErrors?.msnm_google && locationTouched?.msnm_google
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
          onBlur={handleBlur}
          value={locationValues.altitude}
          errorMessage={locationErrors?.altitude}
          hasError={Boolean(
            locationErrors?.altitude && locationTouched?.altitude
          )}
          required
          isFormik
        ></TextField>
      </div>
      <div className="input-group">
        <h2>Región</h2>
        <TextField
          label={"País"}
          id="location.country"
          name="location.country"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.country}
          errorMessage={locationErrors?.country}
          hasError={Boolean(
            locationErrors?.country && locationTouched?.country
          )}
          maxLength={100}
          isFormik
          required
        ></TextField>
        <TextField
          label={"Estado"}
          id="location.state"
          name="location.state"
          onBlur={handleBlur}
          onChange={handleChange}
          value={locationValues.state}
          errorMessage={locationErrors?.state}
          hasError={Boolean(locationErrors?.state && locationTouched?.state)}
          maxLength={100}
          isFormik
          required
        ></TextField>

        <TextField
          label={"Municipio"}
          id="location.municipality"
          name="location.municipality"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.municipality}
          errorMessage={locationErrors?.municipality}
          hasError={Boolean(
            locationErrors?.municipality && locationTouched?.municipality
          )}
          maxLength={100}
          isFormik
        ></TextField>
        <TextField
          label={"Lugar específico"}
          id="location.specific_location"
          name="location.specific_location"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.specific_location}
          errorMessage={locationErrors?.specific_location}
          hasError={Boolean(
            locationErrors?.specific_location &&
              locationTouched?.specific_location
          )}
          maxLength={100}
          isFormik
        ></TextField>
        <TextField
          label={"Kilómetro"}
          id="location.kilometer"
          name="location.kilometer"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.kilometer}
          errorMessage={locationErrors?.kilometer}
          hasError={Boolean(
            locationErrors?.kilometer && locationTouched?.kilometer
          )}
          maxLength={100}
          isFormik
        ></TextField>
      </div>
      <div className="input-group">
        <h2>Instituto</h2>
        <TextField
          label={"Nombre del instituto"}
          id="location.institute"
          name="location.institute"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.institute}
          errorMessage={locationErrors?.institute}
          hasError={Boolean(
            locationErrors?.institute && locationTouched?.institute
          )}
          maxLength={150}
          required
          isFormik
        ></TextField>
        <TextField
          id="location.institute_code"
          name="location.institute_code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={locationValues.institute_code}
          errorMessage={locationErrors?.institute_code}
          hasError={Boolean(
            locationErrors?.institute_code && locationTouched?.institute_code
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
          hasError={Boolean(errors.colection_code && touched.colection_code)}
          errorMessage={errors.colection_code}
          maxWidth={inputWidth}
          onBlur={handleBlur}
          maxLength={20}
        ></TextField>
      </div>
    </div>
  );
}
