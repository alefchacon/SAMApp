import { useState, useEffect } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import Table from "../../../components/ui/Table";

import Taxonomy from "../../../features/specie/components/Taxonomy";
import Button from "../../../components/ui/Button";
import Tabs from "../../../components/ui/Tabs";
import Uploader from "../../../components/ui/Uploader";
import Header from "../../../components/ui/Header";
import TextField from "../../../components/ui/TextField";

import SpecieForm from "../../../features/specie/components/SpecieForm";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import Multigraph from "../../../features/graphing/Multigraph";
import Footer from "../../../components/ui/Footer";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useSpecie } from "../../../features/specie/businessLogic/useSpecie";
import NewSpecimen from "./NewSpecimen/NewSpecimen2";

import DATE_TYPES from "../../../features/graphing/dateTypes";
import { FILE_TYPES_STRING } from "../../../stores/fileTypes";
import HeaderPage from "../../../components/ui/HeaderPage";
import NoResults from "../../../components/ui/NoResults";
import ChipLabel from "../../../components/ui/ChipLabel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../stores/routes";

const METRICS_TAB_ID = "METRICAS";
const SPECIMENS_TAB_ID = "METRICAS";
export default function SpecieDashboard({
  onSelectionChange,
  role = ROLE_TYPES.VISITOR,
  onSpecieSelection,
}) {
  const {
    species,
    getSpecies,
    postSpecie,
    updateSpecie,
    migrateColection,
    selectedSpecieDefault,
    downloadMigrationFormat,
  } = useSpecie();
  const [selectedSpecieId, setSelectedSpecieId] = useState(
    selectedSpecieDefault?.id ?? 0
  );
  const navigate = useNavigate();

  const selectedSpecie =
    species.find((specie) => specie.id === selectedSpecieId) ??
    selectedSpecieDefault;
  onSpecieSelection(selectedSpecie);

  const { specimens, downloadSpecimens } = useSpecimens(selectedSpecie);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
  }, []);

  const handleShowAddSpecimen = () => {
    showModal("Agregar espécimen", <NewSpecimen />, true, "fit-content");
  };

  const navigateToAddSpecimen = () =>
    navigate(`${ROUTES.ADD_SPECIMEN}`, {
      state: {
        specie: selectedSpecie,
        currentSpecimenId: specimens[specimens.length - 1]?.id || 0,
      },
    });

  function AddSpecimenButton() {
    return (
      <div className="flex-row gap-1rem">
        <Button onClick={navigateToAddSpecimen} className={"primary-white"}>
          Agregar espécimen
        </Button>

        <Button
          className="secondary-white"
          iconType="download"
          onClick={downloadSpecimens}
        >
          Descargar especímenes
        </Button>
      </div>
    );
  }

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <SpecieForm onSubmit={postSpecie} />);

  const showSpecieUpdateModal = (specie) => {
    showModal(
      "Editar especie",
      <SpecieForm specie={specie} onSubmit={updateSpecie} />
    );
  };

  const handleSelectedSpecieChange = async (newSelectedIndex) => {
    setSelectedSpecieId(newSelectedIndex);
  };

  function SpecieView() {
    return (
      <>
        <HeaderPage
          centerText={false}
          title={<i>{selectedSpecie?.epithet}</i>}
          padding={false}
        >
          <Taxonomy specie={selectedSpecie} center={false}></Taxonomy>

          {role === ROLE_TYPES.TECHNICAL_PERSON && (
            <>
              <br />
              <AddSpecimenButton />
            </>
          )}
        </HeaderPage>

        {specimens.length > 0 ? (
          <Tabs className={`divider`}>
            {ROLE_TYPES.validate(role) && (
              <div
                label={
                  <div className="flex-row gap-05rem">
                    Especímenes <ChipLabel>{specimens.length}</ChipLabel>
                  </div>
                }
                id={SPECIMENS_TAB_ID}
                className={`specimens flex-col h-100`}
                style={{ overflow: "auto" }}
              >
                <div className="specimens-controls p-05rem gap-1rem flex-row align-items-center">
                  <TextField
                    iconType={"search"}
                    placeholder={
                      "Buscar especímenes por IDs, estado, nombre de colaborador(es)..."
                    }
                  ></TextField>
                </div>
                <Table data={specimens} onEdit={handleShowAddSpecimen}></Table>
              </div>
            )}
            <div label={"Métricas"} id={METRICS_TAB_ID}>
              <div className="p-1rem gap-1rem h-100 multigraph-wrapper">
                <Multigraph
                  graphTitle="Especímenes recolectados por mes"
                  specimens={specimens}
                  attributeToGraph={{
                    name: "colection_date",
                    type: DATE_TYPES.MONTH,
                  }}
                  yLabel="Especímenes"
                  xLabel="Meses"
                />
                <Multigraph
                  graphTitle="Especímenes recolectados por año"
                  specimens={specimens}
                  attributeToGraph={{
                    name: "colection_date",
                    type: DATE_TYPES.YEAR,
                  }}
                  yLabel="Especímenes"
                  xLabel="Meses"
                />
                <Multigraph
                  graphTitle="Especímenes recolectados por mes"
                  specimens={specimens}
                  attributeToGraph={{
                    name: "colection_date",
                    type: DATE_TYPES.MONTH,
                  }}
                  yLabel="Especímenes"
                  xLabel="Meses"
                />
              </div>
            </div>
          </Tabs>
        ) : (
          <NoResults itemName="especímenes" />
        )}
      </>
    );
  }

  return (
    <>
      <SpecieList
        role={role}
        species={species}
        onSelectionChange={handleSelectedSpecieChange}
        onAdd={showSpecieAddModal}
        onEdit={showSpecieUpdateModal}
        onAddSpecimen={navigateToAddSpecimen}
        onFold={setSpecieListFolded}
      ></SpecieList>
      <div className={`specie-view`}>
        <SpecieView />
      </div>
    </>
  );
}
