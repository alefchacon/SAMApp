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
export default function ContributorPanel() {
  const { contributors, getContributors, postContributor } =
    useContributorsAndRoles();
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(contributors);
  const { showModal } = useModal();
  useEffect(() => {
    getContributors();
  }, []);

  const handleShowContributorModal = () => {
    showModal("Colaborador", <ContributorForm onSubmit={postContributor} />);
  };

  const OptionWrapper = ({ children }) => {
    return (
      <li
        className="selectable p-05rem hoverable2 rounded-20"
        style={{ position: "relative" }}
      >
        {children}
      </li>
    );
  };

  return (
    <div label="Colaboradores" className="p-1rem">
      <div className="flex-row gap-1rem align-items-center justify-content-center">
        <TextField
          iconType="search"
          placeholder="Buscar colaboradores"
          onChange={handleFilterChange}
        ></TextField>
        <Button iconType="person_add" onClick={handleShowContributorModal}>
          Registrar colaborador
        </Button>
      </div>
      <br />
      <ul className="unstyled">
        {contributors.length > 0 ? (
          filteredItems.map((contributor, index) => (
            <OptionWrapper key={index}>
              <HoverableActions position="absolute">
                <Button
                  iconType="edit"
                  className="icon-only color-white"
                ></Button>
              </HoverableActions>
              <CardContributor
                contributor={contributor}
                filterText={filterText}
                key={index}
              ></CardContributor>
            </OptionWrapper>
          ))
        ) : (
          <NoResults itemName="colaboradores" />
        )}
      </ul>
    </div>
  );

  function asdf() {}
}
