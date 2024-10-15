import { useState, useEffect } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import SpecimenView from "../../../features/specie/components/SpecimenView";
import Table from "../../../components/ui/Table";
import {
  mockGetSpecies,
  getSpecieList,
} from "../../../features/specie/businessLogic/getSpecies";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import Button from "../../../components/ui/Button";
import Tabs from "../../../components/ui/Tabs";
import Uploader from "../../../components/ui/Uploader";
import Header from "../../../components/ui/Header";
import TextField from "../../../components/ui/TextField";

import { api } from "../../../dataAccess/apiClient";

import NewSpecie from "./NewSpecie";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import Multigraph from "../../../features/graphing/Multigraph";
import Footer from "../../../components/ui/Footer";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useSpecie } from "../../../features/specie/businessLogic/useSpecie";
import NewSpecimen from "./NewSpecimen/NewSpecimen2";

import DATE_TYPES from "../../../features/graphing/dateTypes";
import { FILE_TYPES_STRING } from "../../../stores/fileTypes";
const METRICAS_TAB_KEY = "METRICAS";
import HeaderPage from "../../../components/ui/HeaderPage";
import NoResults from "../../../components/ui/NoResults";
import ChipLabel from "../../../components/ui/ChipLabel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../stores/routes";

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
    uploadColection,
    selectedSpecieDefault,
  } = useSpecie();
  const [selectedSpecieId, setSelectedSpecieId] = useState(
    selectedSpecieDefault?.id ?? 0
  );
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSpecie =
    species.find((specie) => specie.id === selectedSpecieId) ??
    selectedSpecieDefault;
  onSpecieSelection(selectedSpecie);

  if (selectedSpecie) {
  }

  const { specimens, downloadSpecimens } = useSpecimens(selectedSpecie);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
  }, []);

  const handleUploadColection = async (species = []) => {
    const response = await uploadColection(species);
  };

  const handleShowAddSpecimen = () => {
    showModal("Agregar espécimen", <NewSpecimen />, true, "fit-content");
  };

  const navigateToAddSpecimen = () =>
    navigate(`${ROUTES.AGREGAR_ESPECIMEN}`, {
      state: {
        specie: selectedSpecie,
        currentSpecimenId: specimens[specimens.length - 1].id,
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

  function MultiAddSpecie() {
    return (
      <Tabs>
        <div label="Una especie">
          <NewSpecie onSubmit={postSpecie} />
        </div>
        <div label="Múltiples" className="flex-col">
          <Uploader
            accept={FILE_TYPES_STRING.CSV}
            buttonLabel="Agregar especies"
            displayExtension=".CSV"
            multiple
            onUpload={handleUploadColection}
          ></Uploader>
        </div>
      </Tabs>
    );
  }

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <MultiAddSpecie />);

  const showSpecieUpdateModal = (specie) => {
    showModal(
      "Editar especie",
      <NewSpecie specie={specie} onSubmit={updateSpecie} />
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
            <div label={"Métricas"} tabKey={METRICAS_TAB_KEY}>
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
