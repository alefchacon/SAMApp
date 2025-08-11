import React from "react";

import TextField from "../../../components/ui/TextField";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { ISpecimen } from "../domain/model/Specimen";
import Location from "../domain/model/Location";
import FormInput from "@/components/ui/FormInput";
import { Input } from "@/components/ui/input";

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
        <FormInput
          label={"UTM X"}
          name="location.coordinates_cartesian_plane_x"
          hasError={Boolean(locationErrors?.coordinates_cartesian_plane_x)}
          errorMessage={locationErrors?.coordinates_cartesian_plane_x}
          required
        >
          <Input
            type="number"
            name="location.coordinates_cartesian_plane_x"
            id="location.coordinates_cartesian_plane_x"
            value={locationValues.coordinates_cartesian_plane_x}
            defaultValue={locationValues.coordinates_cartesian_plane_x}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
        <FormInput
          label="UTM Y"
          name="location.coordinates_cartesian_plane_y"
          hasError={Boolean(locationErrors?.coordinates_cartesian_plane_y)}
          errorMessage={locationErrors?.coordinates_cartesian_plane_y}
          required
        >
          <Input
            type="number"
            name="location.coordinates_cartesian_plane_y"
            id="location.coordinates_cartesian_plane_y"
            value={locationValues.coordinates_cartesian_plane_y}
            defaultValue={locationValues.coordinates_cartesian_plane_y}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          />
        </FormInput>

        <FormInput
          label="Región UTM"
          name="location.utm_region"
          hasError={Boolean(locationErrors?.utm_region)}
          errorMessage={locationErrors?.utm_region}
          required
        >
          <Input
            type="text"
            name="location.utm_region"
            id="location.utm_region"
            value={locationValues.utm_region}
            defaultValue={locationValues.utm_region}
            onChange={handleChange}
            maxLength={4}
          />
        </FormInput>
      </div>
      <div className="input-group">
        <h2>Coordenadas geográficas</h2>
        <FormInput
          label="Latitud (LN)"
          name="location.geographical_coordinates_y"
          hasError={Boolean(locationErrors?.geographical_coordinates_y)}
          errorMessage={locationErrors?.geographical_coordinates_y}
          required
        >
          <Input
            type="number"
            name="location.geographical_coordinates_y"
            id="location.geographical_coordinates_y"
            value={locationValues.geographical_coordinates_y}
            defaultValue={locationValues.geographical_coordinates_y}
            onChange={handleChange}
            step={0.000001} // you can adjust precision if needed
            min={-90}
            max={90}
          />
        </FormInput>

        <FormInput
          label="Longitud (LW)"
          name="location.geographical_coordinates_x"
          hasError={Boolean(locationErrors?.geographical_coordinates_x)}
          errorMessage={locationErrors?.geographical_coordinates_x}
          required
        >
          <Input
            type="number"
            name="location.geographical_coordinates_x"
            id="location.geographical_coordinates_x"
            value={locationValues.geographical_coordinates_x}
            defaultValue={locationValues.geographical_coordinates_x}
            onChange={handleChange}
            step={0.000001} // precision for long values
            min={-180}
            max={180}
          />
        </FormInput>
      </div>
      <div className="input-group">
        <h2>Elevación</h2>
        <FormInput
          label="MSNM Google"
          name="location.msnm_google"
          hasError={Boolean(locationErrors?.msnm_google)}
          errorMessage={locationErrors?.msnm_google}
          required
        >
          <Input
            type="number"
            name="location.msnm_google"
            id="location.msnm_google"
            value={locationValues.msnm_google}
            defaultValue={locationValues.msnm_google}
            onChange={handleChange}
            step={1}
          />
        </FormInput>

        <FormInput
          label="Altitud"
          name="location.altitude"
          hasError={Boolean(locationErrors?.altitude)}
          errorMessage={locationErrors?.altitude}
          required
        >
          <Input
            type="number"
            name="location.altitude"
            id="location.altitude"
            value={locationValues.altitude}
            defaultValue={locationValues.altitude}
            onChange={handleChange}
            step={1}
          />
        </FormInput>
      </div>
      <div className="input-group">
        <h2>Región</h2>
        <FormInput
          label="País"
          name="location.country"
          hasError={Boolean(locationErrors?.country)}
          errorMessage={locationErrors?.country}
          required
        >
          <Input
            type="text"
            name="location.country"
            id="location.country"
            value={locationValues.country}
            defaultValue={locationValues.country}
            onChange={handleChange}
            maxLength={100}
          />
        </FormInput>

        <FormInput
          label="Estado"
          name="location.state"
          hasError={Boolean(locationErrors?.state)}
          errorMessage={locationErrors?.state}
          required
        >
          <Input
            type="text"
            name="location.state"
            id="location.state"
            value={locationValues.state}
            defaultValue={locationValues.state}
            onChange={handleChange}
            maxLength={100}
          />
        </FormInput>

        <FormInput
          label="Municipio"
          name="location.municipality"
          hasError={Boolean(locationErrors?.municipality)}
          errorMessage={locationErrors?.municipality}
        >
          <Input
            type="text"
            name="location.municipality"
            id="location.municipality"
            value={locationValues.municipality}
            defaultValue={locationValues.municipality}
            onChange={handleChange}
            maxLength={100}
          />
        </FormInput>

        <FormInput
          label="Lugar específico"
          name="location.specific_location"
          hasError={Boolean(locationErrors?.specific_location)}
          errorMessage={locationErrors?.specific_location}
        >
          <Input
            type="text"
            name="location.specific_location"
            id="location.specific_location"
            value={locationValues.specific_location}
            defaultValue={locationValues.specific_location}
            onChange={handleChange}
            maxLength={100}
          />
        </FormInput>

        <FormInput
          label="Kilómetro"
          name="location.kilometer"
          hasError={Boolean(locationErrors?.kilometer)}
          errorMessage={locationErrors?.kilometer}
        >
          <Input
            type="text"
            name="location.kilometer"
            id="location.kilometer"
            value={locationValues.kilometer}
            defaultValue={locationValues.kilometer}
            onChange={handleChange}
            maxLength={100}
          />
        </FormInput>
      </div>
      <div className="input-group">
        <h2>Instituto</h2>
        <FormInput
          label="Nombre del instituto"
          name="location.institute"
          hasError={Boolean(locationErrors?.institute)}
          errorMessage={locationErrors?.institute}
          required
        >
          <Input
            type="text"
            name="location.institute"
            id="location.institute"
            value={locationValues.institute}
            defaultValue={locationValues.institute}
            onChange={handleChange}
            maxLength={150}
          />
        </FormInput>

        <FormInput
          label="Código del instituto"
          required
          name="location.institute_code"
          hasError={Boolean(locationErrors?.institute_code)}
          errorMessage={locationErrors?.institute_code}
        >
          <Input
            type="text"
            name="location.institute_code"
            id="location.institute_code"
            value={locationValues.institute_code}
            defaultValue={locationValues.institute_code}
            onChange={handleChange}
            maxLength={100}
          />
        </FormInput>

        <FormInput
          label="Código de la colección"
          name="colection_code"
          hasError={Boolean(errors.colection_code)}
          errorMessage={errors.colection_code}
          required
        >
          <Input
            type="text"
            name="colection_code"
            id="colection_code"
            value={values.colection_code}
            defaultValue={values.colection_code}
            onChange={handleChange}
            maxLength={20}
            style={{ maxWidth: inputWidth }}
          />
        </FormInput>
      </div>
    </div>
  );
}
