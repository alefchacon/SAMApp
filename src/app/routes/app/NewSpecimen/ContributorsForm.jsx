// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import proj4 from "proj4";

// CUSTOM COMPONENTS
import TextField from "../../../../components/ui/TextField";
import LoadingTextField from "../../../../components/ui/LoadingTextField";
import Button from "../../../../components/ui/Button";
import SelectList from "../../../../components/ui/SelectList";
import Autocomplete from "../../../../components/ui/Autocomplete";
import ContributorModal from "./ContributorModal";

//VALIDATION SCHEMAS
import { specimenSchema } from "../../../../features/specimens/formikSchemas/specimenSchema";

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

export default function ContributorsForm() {
  const handleSubmit = async (values, formActions) => {
    console.log(values);
    console.log(formActions);
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
              <h3>Contribuidores</h3>
              <SelectList modalBody={<ContributorModal />}></SelectList>
            </div>
            <Autocomplete label={"Preparador"}></Autocomplete>
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
