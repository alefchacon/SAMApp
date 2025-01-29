import Page from "../../../components/ui/Page";
import Tabs from "../../../components/ui/Tabs";
import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useUsers from "../../../features/user/businessLogic/useUsers";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import ContributorPanel from "../../../features/contributors/components/ContributorPanel";
import ListItem from "../../../components/ui/ListItem";
import TehnicalPersonForm from "../../../features/user/components/TechnicalPersonForm";
import useSession from "../../../features/auth/businessLogic/useSession";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
export default function Users() {
  const { technicalPersons, getTechnicalPersons, deleteTechnicalPerson } = useUsers();
  const { getContributors } =
    useContributorsAndRoles();
  const { showModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar(); 
  useEffect(() => {
    getTechnicalPersons();
    getContributors();
  }, []);

  const {getProfile} = useSession();
  const profile = getProfile();

  const handleShowTechnicalPersonModal = () => {
    showModal("Agregar técnico", <TehnicalPersonForm onSubmit={closeModal}/>);
  };

  const handleDeleteTechnicalPerson = (technicalPersonId) => {
    deleteTechnicalPerson(technicalPersonId)
    closeModal();
  }

  const handleShowDeleteTechnicalPersonModal = (technicalPerson) => {
    if (technicalPerson.user.email === profile.email){
      showSnackbar("No puede eliminarse a sí mismo", true)
      return;
    }

    showModal("Eliminar técnico", <div>
      ¿Está seguro de eliminar este técnico?
      <ListItem>
        <p>{technicalPerson.fullname}</p>
        <p className="caption">{technicalPerson.position}</p>
      </ListItem>
      <div className="button-row">
        <Button 
          className="secondary" 
          iconType="arrow_back"
          onClick={closeModal}
        >
          No
        </Button>
        <Button 
          className="danger" 
          iconType="delete" 
          onClick={() => handleDeleteTechnicalPerson(technicalPerson.id)}
        >
          Sí, elimínalo
        </Button>
      </div>
    </div>)
  }  

  const technicalPersonTab = (
    <>
      <div className="flex-row gap-1rem justify-content-space-between">
        <p>
          Estos son los usuarios que administran la colección de mamíferos.{" "}
        </p>
        <Button iconType="person_add" onClick={handleShowTechnicalPersonModal}>
          Agregar técnico
        </Button>
      </div>
      <br />
      <ul className="unstyled">
        {technicalPersons.map((technicalPerson, index) => (
          <ListItem key={index}>
            <HoverableActions position="absolute">
              <Button
                iconType="delete"
                className={`icon-only color-white ${profile.email === technicalPerson.user.email ? "disabled" : ""}`}
                onClick={() => handleShowDeleteTechnicalPersonModal(technicalPerson)}
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
        <div label="Contribuidores" className="p-1rem">
          <ContributorPanel></ContributorPanel>
        </div>
      </Tabs>
    </Page>
  );

}
