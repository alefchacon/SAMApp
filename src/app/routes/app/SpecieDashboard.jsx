import { useState, useEffect, useMemo } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";

import EditableTable from "../../../components/ui/table/EditableTable";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import Button from "../../../components/ui/Button";
import Tabs from "../../../components/ui/Tabs";

import SpecieForm from "../../../features/specie/components/SpecieForm";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import Multigraph from "../../../features/graphing/components/Multigraph";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useSpecie } from "../../../features/specie/businessLogic/useSpecie";

import DATE_TYPES from "../../../features/graphing/stores/dateTypes";
import Header from "../../../components/ui/Header";
import NoResults from "../../../components/ui/NoResults";
import ChipLabel from "../../../components/ui/ChipLabel";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../stores/routes";
import editableSpecimenColumns from "../../../features/specimens/editableSpecimenColumns";
import Map from "../../../features/mapping/components/Map";

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
    addSpecie,
    updateSpecie,
    migrateColection,
    selectedSpecieDefault,
    downloadMigrationFormat,
  } = useSpecie();
  const navigate = useNavigate();
  const [selectedSpecieId, setSelectedSpecieId] = useState(
    selectedSpecieDefault?.id ?? 0
  );
  const selectedSpecie = useMemo(
    () =>
      species?.find((specie) => specie.id === selectedSpecieId) ??
      selectedSpecieDefault
  );

  useEffect(() => {
    onSpecieSelection(selectedSpecie);
  }, [selectedSpecie]);

  const { specimens, downloadSpecimens } = useSpecimens(selectedSpecie);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
  }, []);

  const handleEditSpecimen = () => {
    showModal("Agregar espécimen");
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
    showModal("Agregar especie", <SpecieForm onSubmit={addSpecie} />);

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
        <Header
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
        </Header>

        {specimens?.length > 0 ? (
          <Tabs className={`divider`}>
            {ROLE_TYPES.validate(role) && (
              <div
                label={
                  <div className="flex-row gap-05rem">
                    Especímenes <ChipLabel>{specimens.length}</ChipLabel>
                  </div>
                }
                id={SPECIMENS_TAB_ID}
                className={`specimens flex-col h-100 overflow-auto`}
              >
                <EditableTable
                  isTechnicalPerson={role === ROLE_TYPES.TECHNICAL_PERSON}
                  data={specimens}
                  onEdit={handleEditSpecimen}
                  defaultColumns={editableSpecimenColumns}
                ></EditableTable>
              </div>
            )}
            <div label={"Métricas"} id={METRICS_TAB_ID}>

              <div style={{height: "300px", width: "100%", overflow: "hidden"}}>
                <Map specimens={specimens} role={role}></Map>
              </div>

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
        selectedSpecieId={selectedSpecieId}
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
