import React from "react";
import Page from "../../../components/ui/Page";
import Tabs from "@/components/ui/TabsCustom";
import { Button } from "@/components/ui/button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useUsers from "@/features/user/businessLogic/useUsers";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import ContributorPanel from "../../../features/contributors/components/ContributorPanel";
import ListItem from "../../../components/ui/ListItem";
import TehnicalPersonForm from "../../../features/user/components/TechnicalPersonForm";
import useSession from "../../../features/auth/businessLogic/useSession";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import Tab from "@/components/ui/Tab";
import { defaultCloseParams } from "@/components/contexts/IOnCloseProps";
export default function Users() {
  const { technicalPersons, getTechnicalPersons, deleteTechnicalPerson } =
    useUsers();
  const { getContributors } = useContributorsAndRoles();
  const { showModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    getTechnicalPersons();
    getContributors();
  }, []);

  const { getProfile } = useSession();
  const profile = getProfile();

  const handleShowTechnicalPersonModal = () => {
    showModal({
      title: "Agregar técnico",
      content: <TehnicalPersonForm onSubmit={closeModal} />,
    });
  };

  const handleDeleteTechnicalPerson = (technicalPersonId: number) => {
    deleteTechnicalPerson(technicalPersonId);
    closeModal(defaultCloseParams);
  };

  const handleShowDeleteTechnicalPersonModal = (technicalPerson: any) => {
    if (technicalPerson.user.email === profile.email) {
      showSnackbar({
        content: "No puede eliminarse a sí mismo",
        isError: true,
      });
      return;
    }

    showModal({
      title: "Eliminar técnico",
      content: (
        <div>
          ¿Está seguro de eliminar este técnico?
          <ListItem>
            <p>{technicalPerson.fullname}</p>
            <p className="caption">{technicalPerson.position}</p>
          </ListItem>
          <div className="button-row">
            <Button
              className="secondary"
              onClick={() => closeModal(defaultCloseParams)}
            >
              No
            </Button>
            <Button
              className="danger"
              onClick={() => handleDeleteTechnicalPerson(technicalPerson.id)}
            >
              Sí, elimínalo
            </Button>
          </div>
        </div>
      ),
    });
  };

  const technicalPersonTab = (
    <>
      <div className="flex-row gap-1rem justify-content-space-between">
        <p>
          Estos son los usuarios que administran la colección de mamíferos.{" "}
        </p>
        <Button onClick={handleShowTechnicalPersonModal}>
          Agregar técnico
        </Button>
      </div>
      <br />
      <ul className="unstyled">
        {technicalPersons?.map((technicalPerson, index) => (
          <ListItem key={index}>
            <HoverableActions>
              <Button
                className={`icon-only color-white ${
                  profile.email === technicalPerson.user.email ? "disabled" : ""
                }`}
                onClick={() =>
                  handleShowDeleteTechnicalPersonModal(technicalPerson)
                }
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
        <Tab label={"Técnicos"}>{technicalPersonTab}</Tab>
        <Tab label="Contribuidores">
          <ContributorPanel></ContributorPanel>
        </Tab>
      </Tabs>
    </Page>
  );
}
