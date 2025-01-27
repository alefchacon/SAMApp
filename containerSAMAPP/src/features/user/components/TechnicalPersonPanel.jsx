import { useEffect } from "react";
import useUsers from "../businessLogic/useUsers";
import HoverableActions from "../../../components/ui/HoverableActions";
import Button from "../../../components/ui/Button";

export default function TechnicalPersonPanel() {
  const OptionWrapper = ({ children }) => {
    return (
      <li
        className="selectable p-1rem rounded-20 hoverable2 position-relative"
      >
        {children}
      </li>
    );
  };

  const handleShowTechnicalPersonModal = () => {
    showModal("testing!");
  };

  const { technicalPersons, getTechnicalPersons } = useUsers();

  useEffect(() => {
    getTechnicalPersons();
  }, []);

  return (
    <>
      <div className="flex-row gap-1rem">
        <p>Estos son los usuarios que administran la colección. </p>
        <Button iconType="person_add" onClick={handleShowTechnicalPersonModal}>
          Agregar técnico
        </Button>
      </div>
      <br />
      <ul className="unstyled">
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
}
