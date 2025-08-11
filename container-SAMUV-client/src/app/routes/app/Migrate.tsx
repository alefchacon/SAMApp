import React from "react";

import Page from "../../../components/ui/Page";
import Stepper from "../../../components/ui/Stepper";
import { Button } from "@/components/ui/button";
import { useSpecie } from "../../../features/specie/businessLogic/useSpecie";
import Uploader from "@/components/ui/Uploader";
import ContributorPanel from "@/features/contributors/components/ContributorPanel";
import { Formik, Form } from "formik";
import { useModal } from "../../../components/contexts/ModalContext";
import { useState } from "react";
import { Specie } from "@/features/specie/domain/Specie";
import Step from "@/components/ui/Step";
import { Download } from "lucide-react";

export default function Migrate() {
  const { downloadMigrationFormat, migrateColection } = useSpecie();
  const [colection, setColection] = useState<Specie[]>();
  const { showModal } = useModal();

  const handleSubmit = async () => {
    console.error(colection);
    if (!colection) {
      return;
    }
    const errors = await migrateColection(colection);
    if (errors) {
      showModal({
        title: "La migración falló",
        content: (
          <div>
            {errors.map((error, index) => (
              <div>
                <h3>catalog_id: {error.specimen}</h3>
                <ul>
                  {Object.entries(error.errors).map(([key, value]) => (
                    <li>
                      <b>{key}:</b> <>{value}</>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ),
        dismissable: true,
        maxHeight: "",
        width: "500px",
      });
    }
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
            endButtonLabel="Migrar colección"
            onEndButtonClick={handleSubmit}
          >
            <Step label={"Colaboradores"} id="colaboradores">
              <>
                Antes de comenzar, se recomienda que ya estén registrados en el
                sistema todos los colectores y preparadores cuyos códigos
                aparezcan en el archivo .CSV que desea migrar.
                <br />
                <br />
                Este paso es opcional: el sistema registrará todos los códigos
                que estén en el archivo y que aún no se hayan registrado, pero
                el nombre lo tendrá que asignar usted después en la sección
                Personal.
                <ContributorPanel></ContributorPanel>
              </>
            </Step>
            <Step label={"Consiga el formato"} id="formato">
              <>
                <p>
                  Para facilitar el procesamiento de los datos, la migración
                  requiere de un formato .CSV específico. Por favor, no haga su
                  propio .CSV, ya que podría no tener la codificación necesaria
                  para procesar los datos correctamente: descargue el formato
                  que fue preparado.
                </p>
                <br />

                <Button onClick={downloadMigrationFormat}>
                  <Download></Download> Descargar formato vacío
                </Button>
              </>
            </Step>

            <Step label={"Llene el formato"} id="llene-formato">
              <>
                <h2>Copiar y pegar</h2>
                <p>
                  Las columnas de SAM_MIGRACION.csv siguen el mismo orden que
                  las de la colección original, por lo que puede copiar y pegar
                  los registros. Antes de hacerlo, deberá eliminar algunas
                  columnas de la colección. Haga una copia de la colección y
                  elimine:
                </p>
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
                <br />
                <h2>Celdas vacías</h2>
                <p>
                  Varias columnas requieren un valor. Si estas columnas están
                  vacías a la hora de subirlas, el sistema asignará el siguiente
                  valor por defecto:
                </p>
                <br />
                <p>
                  Una vez llenado, SAM_MIGRACION.csv debería verse como el
                  siguiente ejemplo, el cual fue probado sin error alguno:
                </p>
                <br />
                <br />
                <p></p>
                <Button>
                  <Download></Download> Descargar ejemplo con datos de prueba
                </Button>
              </>
            </Step>
            <Step label={"Suba el archivo"} id="subir">
              <>
                <p>
                  Suba su archivo y de clic en <b>Migrar colección</b>. En caso
                  de tener errores, se desplegará una pantalla con la lista de
                  incidencias, ordenadas por espécimen.
                </p>
                <br />
                <Uploader
                  onParse={(parsedFile) => setColection(parsedFile)}
                ></Uploader>
              </>
            </Step>
          </Stepper>
        </Form>
      </Formik>
    </Page>
  );
}
