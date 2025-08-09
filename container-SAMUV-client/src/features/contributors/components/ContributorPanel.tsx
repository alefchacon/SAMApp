import React from "react";
import { Button } from "@/components/ui/button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useContributorsAndRoles from "../businessLogic/useContributorsAndRoles";
import CardContributor from "./CardContributor";
import ContributorForm from "./ContributorForm";
import NoResults from "../../../components/ui/NoResults";
import TextField from "../../../components/ui/TextField";
import useTextFilter from "../../../hooks/useTextFilter";
import ListItem from "../../../components/ui/ListItem";
import Contributor, { IContributorSpecimen } from "../domain/Contributor";

export default function ContributorPanel() {
  const { contributors, getContributors, addContributor, updateContributor } =
    useContributorsAndRoles();

  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter<IContributorSpecimen>({ items: contributors });

  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getContributors();
  }, []);

  const handleShowContributorModal = () => {
    showModal({
      title: "Agregar contribuidor",
      content: (
        <ContributorForm onSubmit={addContributor} onCancel={closeModal} />
      ),
    });
  };
  const handleEditContributorModal = (contributor: Contributor) => {
    showModal({
      title: "Editar contribuidor",
      content: (
        <ContributorForm
          onSubmit={updateContributor}
          contributor={contributor}
        />
      ),
    });
  };

  return (
    <>
      <div className="flex-row gap-1rem align-items-center justify-content-center">
        <TextField
          iconType="search"
          placeholder="Buscar contribuidores"
          onChange={handleFilterChange}
        ></TextField>
        <Button onClick={handleShowContributorModal}>
          Agregar contribuidor
        </Button>
      </div>
      <br />
      <ul className="unstyled">
        {contributors.length > 0 ? (
          filteredItems.map((contributor, index) => (
            <>
              <ListItem key={index}>
                <HoverableActions>
                  <Button
                    onClick={() => handleEditContributorModal(contributor)}
                    className="icon-only color-white"
                  ></Button>
                </HoverableActions>
                <CardContributor
                  index={index}
                  contributor={contributor}
                  filterText={filterText}
                  key={index}
                ></CardContributor>
              </ListItem>
            </>
          ))
        ) : (
          <NoResults itemName="contribuidores" />
        )}
      </ul>
    </>
  );
}
