import Page from "../../../components/ui/Page";
import Tabs from "../../../components/ui/Tabs";
import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useUsers from "../../../features/user/businessLogic/useUsers";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import CardContributor from "../../../features/contributors/components/CardContributor";
import ContributorForm from "../../../features/contributors/components/ContributorForm";
import ContributorPanel from "../../../features/contributors/components/ContributorPanel";
import TechnicalPersonPanel from "../../../features/user/technicalperson/TechnicalPersonPanel";
import ListItem from "../../../components/ui/ListItem";

import TehnicalPersonForm from "../../../features/user/technicalperson/TechnicalPersonForm";

export default function Users() {
  const { technicalPersons, getTechnicalPersons } = useUsers();
  const { contributors, getContributors, addContributor } =
    useContributorsAndRoles();
  const { showModal } = useModal();
  useEffect(() => {
    getTechnicalPersons();
    getContributors();
  }, []);

  const handleShowTechnicalPersonModal = () => {
    showModal("Agregar técnico", <TehnicalPersonForm />);
  };
  const handleShowContributorModal = () => {
    showModal("Colaborador", <ContributorForm onSubmit={addContributor} />);
  };

  const OptionWrapper = ({ children }) => {
    return (
      <li
        className="selectable p-1rem rounded-20 hoverable2 position-relative"
      >
        {children}
      </li>
    );
  };

  const technicalPersonTab = (
    <>
      <div className="flex-row gap-1rem justify-content-space-between">
        <p>
          Estos son los usuarios que administran la colección de mamíferos.{" "}
        </p>
        <Button iconType="person_add" onClick={handleShowTechnicalPersonModal}>
          Registrar técnico
        </Button>
      </div>
      <br />
      <ul className="unstyled">
        {technicalPersons.map((technicalPerson, index) => (
          <ListItem key={index}>
            <HoverableActions position="absolute">
              <Button
                iconType="edit"
                className="icon-only color-white"
              ></Button>
            </HoverableActions>
            <p>{technicalPerson.fullname}</p>
            <p className="caption">{technicalPerson.position}</p>
          </ListItem>
        ))}
      </ul>
    </>
  );

  return (
    <Page title={"Usuarios"}>
      <Tabs>
        <div label={"Técnicos"} className="p-1rem">
          {technicalPersonTab}
        </div>
        <div label="Colaboradores" className="p-1rem">
          <ContributorPanel></ContributorPanel>
        </div>
      </Tabs>
    </Page>
  );

  function asdf() {}
}
