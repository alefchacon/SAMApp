// LIBRARIES
import { useState } from "react";
import { Formik, Form } from "formik";
// CUSTOM COMPONENTS
import TextField from "../../../components/ui/TextField";
import SearchField from "../../../components/ui/SearchField";
import Button from "../../../components/ui/Button";

//VALIDATION SCHEMAS
import { specimenSchema } from "../../specie/formikSchemas/specimenSchema";

export default function LocationForm() {
  return (
    <div>
      <Formik
        validationSchema={specimenSchema}
        initialValues={{
          coordinates_cartesian_plane_x: "12.34",
          coordinates_cartesian_plane_y: 12.34,
          utm_region: "utm region",
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <div className="input-group divider">
              <h3>Coordenadas cartesianas</h3>

              <TextField
                id="coordinates_cartesian_plane_x"
                name="coordinates_cartesian_plane_x"
                errorMessage={errors.coordinates_cartesian_plane_x}
                hasError={
                  errors.coordinates_cartesian_plane_x &&
                  touched.coordinates_cartesian_plane_x
                }
                label={"Coordenada X"}
                required
                isFormik
                type="number"
              ></TextField>
              <TextField label={"Coordenada Y"} required></TextField>
              <TextField
                label={"Región UTM"}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas cartesianas."
                }
                required
                disabled
              ></TextField>
            </div>
            <div className="input-group divider">
              <h3>Coordenadas geográficas</h3>
              <TextField label={"Coordenada X (Longitud)"} required></TextField>
              <TextField label={"Coordenada Y (Latitud)"} required></TextField>
              <TextField
                label={"Metros a nivel del mar"}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                required
                disabled
              ></TextField>
              <TextField
                label={"País"}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                required
                disabled
              ></TextField>
              <TextField
                label={"Estado"}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                required
                disabled
              ></TextField>
              <TextField
                label={"Municipio"}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                required
                disabled
              ></TextField>
            </div>
            <div className="form-actions">
              <Button variant="secondary" label="Cancelar"></Button>
              <Button variant="primary" label="Agregar espécimen"></Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
