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
  const [species, getSpecies, addSpecie, updateSpecie, selectedSpecieDefault] =
    useSpecie();
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

  const [specimens] = useSpecimens(selectedSpecieId);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
  }, []);

  const handleMultiAddSpecie = (species = []) => {
    console.log(species[0]);
    for (let i = 0; i < species[0].length; i++) {
      species[0][
        i
      ].scientific_name = `${species[0][i].gender} ${species[0][i].epithet}`;
      addSpecie(species[0][i]);
    }
  };

  const handleShowAddSpecimen = () => {
    showModal("Agregar espécimen", <NewSpecimen />, true, "fit-content");
  };

  const navigateToAddSpecimen = () =>
    navigate(`${location.pathname}${ROUTES.AGREGAR_ESPECIMEN}`);

  function AddSpecimenButton() {
    return (
      <div className="flex-row gap-1rem">
        <Button onClick={navigateToAddSpecimen} className={"primary-white"}>
          Agregar espécimen
        </Button>

        <Button className="secondary-white" iconType="download">
          Descargar especímenes
        </Button>
      </div>
    );
  }

  function MultiAddSpecie() {
    return (
      <Tabs>
        <div label="Una especie">
          <NewSpecie onSubmit={addSpecie} />
        </div>
        <div
          label="Múltiples"
          className="flex-row justify-content-center align-items-center"
        >
          <br />
          <Uploader
            accept={FILE_TYPES_STRING.CSV}
            buttonLabel="Agregar especies"
            displayExtension=".CSV"
            multiple
            onUpload={(species) => handleMultiAddSpecie(species)}
          ></Uploader>
        </div>
      </Tabs>
    );
  }

  const showDeleteSpecieModal = (specieId) => {
    showModal(
      "Eliminar especie",
      <div className="flex-col">
        <p>¿Está seguro de eliminar esta especie?</p>
        <br />
        <p>{selectedSpecie.scientific_name}</p>
        <Taxonomy specie={selectedSpecie} center={false}></Taxonomy>
        <div className="button-row">
          <Button
            iconType="delete"
            className="danger"
            onClick={() => deleteSpecie(specieId)}
          >
            Sí, elimina la especie
          </Button>
        </div>
      </div>
    );
  };

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <MultiAddSpecie />);

  const showSpecieEditModal = (specie) => {
    showModal("Editar especie", <NewSpecie specie={specie} />);
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
                className={`specimens flex-col h-100 p-1rem`}
                style={{ overflow: "auto" }}
              >
                <div className="specimens-controls p-1rem gap-1rem flex-row align-items-center">
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
        <Footer></Footer>
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
        onEdit={showSpecieEditModal}
        onAddSpecimen={navigateToAddSpecimen}
        onFold={setSpecieListFolded}
      ></SpecieList>
      <div className={`specie-view`}>
        <ChipLabel
          iconType={"female"}
          color="var(--pink)"
          backgroundColor="var(--light-pink)"
          width="100px"
        >
          Hembra
        </ChipLabel>
        <ChipLabel
          width="100px"
          iconType={"male"}
          color="var(--uv-blue)"
          backgroundColor="var(--light-blue)"
        >
          Macho
        </ChipLabel>
        <SpecieView />
      </div>
    </>
  );
}
