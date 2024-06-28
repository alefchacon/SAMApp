// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import proj4 from "proj4";

// CUSTOM COMPONENTS
import TextField from "../../../components/ui/TextField";
import LoadingTextField from "../../../components/ui/LoadingTextField";
import Button from "../../../components/ui/Button";

// API CALLS
import { getElevation } from "../api/external/getElevation";
import { getLocation } from "../api/external/getLocation";

//VALIDATION SCHEMAS
import { specimenSchema } from "../../specie/formikSchemas/specimenSchema";

const CoordinateChangeListener = ({ coordinateX, coordinateY, onChange }) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    //calculateUTMRegion();
    onChange(values[coordinateX], values[coordinateY]);
  }, [values[coordinateX], onChange, coordinateX]);

  const calculateUTMRegion = async (coordinateX, coordinateY) => {
    const utmZone = Math.floor((coordinateX + 180) / 6) + 1;
    const utmProjection = `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`;
    const [x, y] = proj4(wgs84, utmProjection, [coordinateX, coordinateY]);
    console.log({ x, y, zone: utmZone });
  };

  return null;
};

export default function LocationForm() {
  const [UTMRegion, setUTMRegion] = useState("");
  const wgs84 = proj4.WGS84;
  useEffect(() => {}, []);
  const handleSubmit = async (values, formActions) => {
    console.log(values);
    console.log(formActions);

    const utmZone =
      Math.floor((values.geographical_coordinates_x + 180) / 6) + 1;
    const utmProjection = `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`;
    const [x, y] = proj4(wgs84, utmProjection, [
      values.geographical_coordinates_x,
      values.geographical_coordinates_y,
    ]);

    formActions.setFieldValue("utm_region", utmZone);

    console.log({ x, y, zone: utmZone });

    const elevationResponse = await getElevation(
      values.geographical_coordinates_x,
      values.geographical_coordinates_y
    );

    const locationResponse = await getLocation(
      values.geographical_coordinates_x,
      values.geographical_coordinates_y
    );
    console.log(locationResponse);

    if (elevationResponse.status !== 200) {
      return;
    }

    formActions.setFieldValue(
      "msnm_google",
      elevationResponse.data.results[0].elevation
    );

    formActions.setFieldValue("country", locationResponse.data.address.country);
    formActions.setFieldValue("state", locationResponse.data.address.state);

    const address = locationResponse.data.address;
    let municipality = "";
    if ("city" in address) {
      municipality = address.city;
    } else if ("town" in address) {
      municipality = address.town;
    } else if ("county" in address) {
      municipality = address.county;
    }

    formActions.setFieldValue("municipality", municipality);
  };

  const handleCoordinateChange = () => {
    const timer = setTimeout(() => {
      onStateChange();
    }, 3000); // wait for 3 seconds

    clearTimeout(timer); // cleanup the timeout if the component unmounts or state changes
  };

  const handleCartesianChange = (newCoordinate, pairCoordinate) => {
    console.log("Value changed:", newCoordinate);
    console.log("Value old:", pairCoordinate);
  };

  return (
    <div>
      <Formik
        //validationSchema={specimenSchema}
        onSubmit={handleSubmit}
        initialValues={{
          coordinates_cartesian_plane_x: "1",
          coordinates_cartesian_plane_y: "",
          geographical_coordinates_x: "",
          geographical_coordinates_y: "",
          utm_region: "",
          msnm_google: "",
          municipality: "",
          state: "",
          country: "",
        }}
      >
        {({ errors, touched, isValid, dirty, setFieldValue, values }) => (
          <Form>
            <div className="input-group divider">
              <h3>Coordenadas cartesianas</h3>

              <TextField
                label={"Coordenada X"}
                id="coordinates_cartesian_plane_x"
                name="coordinates_cartesian_plane_x"
                errorMessage={errors.coordinates_cartesian_plane_x}
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
                errorMessage={errors.coordinates_cartesian_plane_y}
                hasError={
                  errors.coordinates_cartesian_plane_y &&
                  touched.coordinates_cartesian_plane_y
                }
                label={"Coordenada Y"}
                required
                isFormik
                type="number"
              ></TextField>
            </div>
            <div className="input-group divider">
              <h3>Coordenadas geográficas</h3>
              <TextField
                label={"Coordenada Y (Latitud)"}
                id="geographical_coordinates_y"
                name="geographical_coordinates_y"
                errorMessage={errors.geographical_coordinates_y}
                hasError={
                  errors.geographical_coordinates_y &&
                  touched.geographical_coordinates_y
                }
                required
                isFormik
                type="number"
              ></TextField>
              <TextField
                label={"Coordenada X (Longitud)"}
                id="geographical_coordinates_x"
                name="geographical_coordinates_x"
                errorMessage={errors.geographical_coordinates_x}
                hasError={
                  errors.geographical_coordinates_x &&
                  touched.geographical_coordinates_x
                }
                required
                isFormik
                type="number"
              ></TextField>
              <TextField
                label={"País"}
                id="country"
                name="country"
                errorMessage={errors.country}
                hasError={errors.country && touched.country}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                isFormik
                required
              ></TextField>
              <TextField
                label={"Estado"}
                id="state"
                name="state"
                errorMessage={errors.state}
                hasError={errors.state && touched.state}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                isFormik
                required
              ></TextField>
              <TextField
                label={"Municipio"}
                id="municipality"
                name="municipality"
                errorMessage={errors.municipality}
                hasError={errors.municipality && touched.municipality}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                isFormik
                required
              ></TextField>
              <TextField
                label={"Metros a nivel del mar"}
                id="msnm_google"
                name="msnm_google"
                errorMessage={errors.msnm_google}
                hasError={errors.msnm_google && touched.msnm_google}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas geográficas."
                }
                required
                isFormik
              ></TextField>
              <TextField
                label={"Región UTM"}
                id="utm_region"
                name="utm_region"
                errorMessage={errors.utm_region}
                hasError={errors.utm_region && touched.utm_region}
                helperText={
                  "Este campo se llena automáticamente al ingresar las coordenadas cartesianas."
                }
                type="number"
                required
                isFormik
              ></TextField>
            </div>
            <div className="form-actions">
              <Button
                variant="secondary"
                label="Cancelar"
                onClick={() =>
                  console.log(values.coordinates_cartesian_plane_x)
                }
              ></Button>
              <Button
                variant="primary"
                label="Agregar espécimen"
                type="submit"
              ></Button>
            </div>

            {/* 


            <CoordinateChangeListener
              coordinateX="geographical_coordinates_x"
              coordinateY="geographical_coordinates_y"
              onChange={handleCartesianChange}
            />
            */}
          </Form>
        )}
      </Formik>
    </div>
  );
}
