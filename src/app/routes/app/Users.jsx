import Page from "../../../components/ui/Page";
import Tabs from "../../../components/ui/Tabs";
import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useUsers from "../../../features/user/businessLogic/useUsers";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import CardContributor from "../../../features/contributors/components/CardContributor";
import ContributorForm from "./NewSpecimen/ContributorForm";
export default function Users() {
  const { technicalPersons, getTechnicalPersons } = useUsers();
  const { contributors, getContributors, postContributor } =
    useContributorsAndRoles();
  const { showModal } = useModal();
  useEffect(() => {
    getTechnicalPersons();
    getContributors();
  }, []);

  const handleShowTechnicalPersonModal = () => {
    showModal("testing!");
  };
  const handleShowContributorModal = () => {
    showModal("Colaborador", <ContributorForm onSubmit={postContributor} />);
  };

  const OptionWrapper = ({ children }) => {
    return (
      <li
        className="selectable p-1rem rounded-20 hoverable2"
        style={{ position: "relative" }}
      >
        {children}
      </li>
    );
  };

  const technicalPersonTab = (
    <>
      <div className="flex-row gap-1rem">
        <p>Estos son los usuarios que administran la colección. </p>
        <Button iconType="person_add" onClick={handleShowTechnicalPersonModal}>
          Registrar técnico
        </Button>
      </div>
      <br />
      <ul>
        {technicalPersons.map((technicalPerson, index) => (
          <OptionWrapper key={index}>
            <HoverableActions position="absolute">
              <Button
                iconType="edit"
                className="icon-only color-white"
              ></Button>
            </HoverableActions>
            <p>{technicalPerson.fullname}</p>
            <p className="caption">{technicalPerson.position}</p>
          </OptionWrapper>
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
          <div className="flex-row gap-1rem">
            <p>
              Estos son los individuos que aportan especímenes a la colección.{" "}
            </p>
            <Button iconType="person_add" onClick={handleShowContributorModal}>
              Registrar colaborador
            </Button>
          </div>
          <ul>
            {contributors.map((contributor, index) => (
              <OptionWrapper>
                <HoverableActions position="absolute">
                  <Button
                    iconType="edit"
                    className="icon-only color-white"
                  ></Button>
                </HoverableActions>
                <CardContributor
                  contributor={contributor}
                  key={index}
                ></CardContributor>
              </OptionWrapper>
            ))}
          </ul>
        </div>
      </Tabs>
    </Page>
  );

  function asdf() {}
}
