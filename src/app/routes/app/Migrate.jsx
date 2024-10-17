import Page from "../../../components/ui/Page";
import Stepper from "../../../components/ui/Stepper";
import Button from "../../../components/ui/Button";
import { useSpecie } from "../../../features/specie/businessLogic/useSpecie";
import Uploader from "../../../components/ui/Uploader";
import ContributorPanel from "../../../features/contributors/components/ContributorPanel";
import { Formik, Form } from "formik";

import { useState } from "react";

export default function Migrate() {
  const { downloadMigrationFormat, migrateColection } = useSpecie();
  const [colection, setColection] = useState();

  const handleSubmit = () => {
    console.log(colection);
    migrateColection(colection);
  };

  return (
    <Page
      title={"Migrar colección"}
      subtitle={"Agregue múltiples especies y/o especímenes en formato .CSV"}
    >
      <Formik onSubmit={handleSubmit} initialValues={{ colection }}>
        <Form>
          <Stepper
            selectedStepId={"colaboradores"}
            endButtonLabel="Migrar biocolección"
          >
            <div label={"Colaboradores"} id="colaboradores" className="p-2rem">
              Antes de comenzar, por favor asegúrese que ya estén registrados en
              el sistema todos los colectores y preparadores que aparezcan en la
              colección que desea migrar.
              <ContributorPanel></ContributorPanel>
            </div>
            <div label={"Consiga el formato"} id="formato" className="p-2rem">
              <p>
                Para facilitar el procesamiento de los datos, la migración
                requiere de un formato .CSV específico. Por favor, no haga su
                propio .CSV, ya que podría no tener la codificación necesaria
                para procesar los datos correctamente: descargue el formato que
                fue preparado.
              </p>
              <br />

              <Button iconType="download" onClick={downloadMigrationFormat}>
                Descargar formato vacío
              </Button>
            </div>

            <div
              label={"Llene el formato"}
              id="llene-formato"
              className="p-2rem"
            >
              <h2>Copiar y pegar</h2>
              <p>
                Las columnas de SAM_MIGRACION.csv siguen el mismo orden que las
                de la colección original, por lo que puede copiar y pegar los
                registros. Antes de hacerlo, deberá eliminar algunas columnas de
                la colección. Haga una copia de la colección y elimine:
                <ul>
                  <li>
                    Columnas marcadas como <b>NO TOCAR</b>
                  </li>
                  <li>
                    La columna <b>FECHA_COL:</b> El sistema utilizará las
                    columnas de DIA, MES y AÑO para registrar la fecha de
                    colecta de cada espécimen. Por favor, asegure que todas las
                    fechas tengan ese orden (por ejemplo, que ningún valor de la
                    columna MES sea mayor a 12).
                  </li>
                </ul>
              </p>
              <br />
              <h2>Celdas vacías</h2>
              <p>
                Las siguientes columnas requieren un valor — si no lo tienen, se
                les asignará el siguiente por defecto:
              </p>
              <ul>
                <li>SEXO / sex: ND</li>
                <li>N° EMB / number_embryos: 0</li>
                <li>EDAD / class_age: ND</li>
                <li>LT / length_total: 0</li>
                <li>LC / length_tail: 0</li>
                <li>LP / length_paw: 0</li>
                <li>LO / length_ear: 0</li>
                <li>PESO / weight: 0</li>
                <li>LW / geographical_coordinates_x: 0</li>
                <li>LN / geographical_coordinates_y: 0</li>
                <li>ALTITUD / altitude: 0</li>
              </ul>
              <br />
              <br />
              <p>
                Una vez llenado, SAM_MIGRACION.csv debería verse como el
                siguiente ejemplo, el cual fue probado sin error alguno:
              </p>
              <br />
              <br />
              <p></p>
              <Button iconType="download">
                Descargar ejemplo con datos de prueba
              </Button>
            </div>
            <div label={"Suba el archivo"} id="subir" className="p-2rem">
              <p>
                Suba su archivo y de clic en <b>Migrar colección</b>. En caso de
                tener errores, se desplegará una pantalla con la lista de
                incidencias, ordenadas por espécimen.
              </p>
              <br />
              <Uploader
                onParse={(parsedFile) => setColection(parsedFile)}
              ></Uploader>
            </div>
          </Stepper>
        </Form>
      </Formik>
    </Page>
  );
}
