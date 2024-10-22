import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import CardContributor from "../../../features/contributors/components/CardContributor";
import ContributorForm from "./ContributorForm";
import NoResults from "../../../components/ui/NoResults";
import TextField from "../../../components/ui/TextField";
import useTextFilter from "../../../hooks/useTextFilter";
import ListItem from "../../../components/ui/ListItem";
export default function ContributorPanel() {
  const { contributors, getContributors, postContributor, updateContributor } =
    useContributorsAndRoles();
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(contributors);
  const { showModal } = useModal();
  useEffect(() => {
    getContributors();
  }, []);

  const handleShowContributorModal = () => {
    showModal(
      "Agregar colaborador",
      <ContributorForm onSubmit={postContributor} />
    );
  };
  const handleEditContributorModal = (contributor) => {
    showModal(
      "Editar colaborador",
      <ContributorForm onSubmit={updateContributor} contributor={contributor} />
    );
  };

  return (
    <>
      <div className="flex-row gap-1rem align-items-center justify-content-center">
        <TextField
          iconType="search"
          placeholder="Buscar colaboradores"
          onChange={handleFilterChange}
        ></TextField>
        <Button iconType="person_add" onClick={handleShowContributorModal}>
          Agregar colaborador
        </Button>
      </div>
      <br />
      <ul className="unstyled">
        {contributors.length > 0 ? (
          filteredItems.map((contributor, index) => (
            <ListItem key={index}>
              <HoverableActions position="absolute">
                <Button
                  iconType="edit"
                  onClick={() => handleEditContributorModal(contributor)}
                  className="icon-only color-white"
                ></Button>
              </HoverableActions>
              <CardContributor
                contributor={contributor}
                filterText={filterText}
                key={index}
              ></CardContributor>
            </ListItem>
          ))
        ) : (
          <NoResults itemName="colaboradores" />
        )}
      </ul>
    </>
  );

  function asdf() {}
}
