import React, { useState, useEffect, useMemo, Component } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";

import EditableTable from "../../../components/ui/table/EditableTable";
import Taxonomy from "../../../features/specie/components/Taxonomy";
// import Button from "../../../components/ui/Button";
import Tabs from "@/components/ui/Tabs";

import SpecieForm from "@/features/specie/components/SpecieForm";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES, UserRoles } from "../../../stores/EUserRoles";
import Multigraph from "../../../features/graphing/components/Multigraph";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";

import DATE_TYPES, { DateTypes } from "@/features/graphing/stores/dateTypes";
import Header from "@/components/ui/Header";
import NoResults from "../../../components/ui/NoResults";
import { useNavigate } from "react-router-dom";
import FrontendRoutes from "@/routing/FrontendRoutes";
import editableSpecimenColumns from "../../../features/specimens/EditableSpecimenColumns";
import Map from "@/features/mapping/components/Map";
import { useParams } from "react-router-dom";
import { Specie, defaultSpecie } from "@/features/specie/domain/Specie";
import ChipLabel from "@/components/ui/ChipLabel";
import Tab from "@/components/ui/Tab";
import Button from "@/components/ui/ButtonCustom";
import TextField from "@/components/ui/TextField";

const METRICS_TAB_ID = "METRICAS";
const SPECIMENS_TAB_ID = "METRICAS";

interface ISpecieDashboardProps {
  role: UserRoles;
  onSpecieSelection: (selectedSpecie: Specie) => void;
}
export default function SpecieDashboard(props: ISpecieDashboardProps) {
  const { role, onSpecieSelection } = props;

  const {
    species,
    getSpecies,
    addSpecie,
    updateSpecie,
    selectedSpecieDefault,
  } = useSpecie();
  const navigate = useNavigate();
  const { specieId } = useParams();

  const [selectedSpecieId, setSelectedSpecieId] = useState(
    Number(specieId) ?? 0
  );

  const selectedSpecie: Specie = useMemo(
    () =>
      species?.find((specie) => specie.id === selectedSpecieId) ??
      defaultSpecie,
    [selectedSpecieId]
  );

  useEffect(() => {
    if (!selectedSpecie) {
      return;
    }
    // DEV ONLY: fix navigation
    //navigate(`/${FrontendRoutes.COLLECTION}/${selectedSpecie?.id}`);
    onSpecieSelection(selectedSpecie);
  }, [selectedSpecie]);

  const { specimens, downloadSpecimens } = useSpecimens(selectedSpecie);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
    // DEV ONLY: check if this dep array works the same as []
  }, [getSpecies]);

  const handleEditSpecimen = () => {
    showModal({ title: "Agregar espécimen" });
  };

  const navigateToAddSpecimen = () =>
    navigate(`${FrontendRoutes.ADD_SPECIMEN}`, {
      state: {
        specie: selectedSpecie,
        currentSpecimenId: specimens[specimens.length - 1]?.id || 0,
      },
    });

  function TechnicalPersonButtons() {
    if (!(role === ROLE_TYPES.TECHNICAL_PERSON)) {
      return null;
    }

    return (
      <div className="flex-row gap-1rem">
        <Button onClick={navigateToAddSpecimen} primary>
          Agregar espécimen
        </Button>

        <Button onClick={downloadSpecimens} icon="download">
          Descargar especímenes
        </Button>
      </div>
    );
  }

  const showSpecieAddModal = () =>
    showModal({
      title: "Agregar especie",
      content: <SpecieForm onSubmit={addSpecie} />,
    });

  const showSpecieUpdateModal = (specie: Specie) => {
    showModal({
      title: "Editar especie",
      content: <SpecieForm specie={specie} onSubmit={updateSpecie} isUpdate />,
    });
  };

  const handleSelectedSpecieChange = async (newSelectedIndex: number) => {
    setSelectedSpecieId(newSelectedIndex);
  };

  const memoizedTable = useMemo(
    () => (
      <EditableTable
        isTechnicalPerson={role === ROLE_TYPES.TECHNICAL_PERSON}
        data={specimens}
        defaultColumns={editableSpecimenColumns}
      ></EditableTable>
    ),
    [specimens]
  );

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  function SpecieView() {
    return (
      <>
        <Header
          title={<i>{selectedSpecie?.epithet}</i>}
          padding={false}
          rightContent={<TechnicalPersonButtons />}
        >
          <Taxonomy specie={selectedSpecie} center={false}></Taxonomy>
        </Header>

        {specimens?.length > 0 ? (
          <Tabs
            className={`divider`}
            onChange={setActiveTabIndex}
            defaultActiveTabIndex={activeTabIndex}
          >
            {/* DEV ONLY: validate user is logged in:*/}
            <Tab
              label="Especímenes"
              // id={SPECIMENS_TAB_ID}
            >
              {memoizedTable}
            </Tab>
            <Tab label={"Métricas"}>
              <>
                <div style={{ width: "100%", overflow: "hidden" }}>
                  <Map specimens={specimens} role={role}></Map>
                </div>

                <div className="p-3 gap-3 h-full multigraph-wrapper">
                  <Multigraph
                    graphTitle="Especímenes recolectados por mes"
                    specimens={specimens}
                    attributeToGraph={{
                      name: "colection_date",
                      type: DateTypes.MONTH,
                    }}
                    yLabel="Especímenes"
                    xLabel="Meses"
                  />
                  <Multigraph
                    graphTitle="Especímenes recolectados por año"
                    specimens={specimens}
                    attributeToGraph={{
                      name: "colection_date",
                      type: DateTypes.YEAR,
                    }}
                    yLabel="Especímenes"
                    xLabel="Meses"
                  />
                </div>
              </>
            </Tab>
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
      <div
        className={`specie-view rounded-lg outline outline-black/8 bg-white`}
      >
        <SpecieView />
      </div>
    </>
  );
}
