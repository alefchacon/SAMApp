import InfoItem from "../../../components/ui/InfoItem";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import Button from "../../../components/ui/Button";
import LOREM_IPSUM from "../../../stores/loremIpsum";
import { useModal } from "../../../components/contexts/ModalContext";

export default function AccessRequest({
  fullheight = true,
  accessRequest = {
    orcid: "0000-0000-0000-0000",
    email: "email@email.com",
    about: LOREM_IPSUM.LONG,
  },
}) {
  const { showModal } = useModal();

  const toggleAcademicModal = () => {
    showModal(
      "Información del académico",
      <div className="flex-col">
        <h3>{`${accessRequest.academic.names} ${accessRequest.academic.father_last_name} ${accessRequest.academic.mother_last_name}`}</h3>
        <p>{accessRequest.academic.degree}</p>
        <p className="flex-row">
          {accessRequest.academic.position} en {accessRequest.academic.college}
        </p>
        <p>
          {accessRequest.academic.city}, {accessRequest.academic.state}
        </p>
      </div>
    );
  };

  return (
    <div className="access-request flex-col" style={{ maxHeight: "600px" }}>
      <div
        className="flex-col gap-05rem"
        style={{
          height: "100%",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div className="flex-row gap-1rem align-items-center">
          <InfoItem
            label={
              <h3>
                {accessRequest.academic.names + " "}
                {accessRequest.academic.father_last_name + " "}
                {accessRequest.academic.mother_last_name}
              </h3>
            }
            iconType={"person"}
          ></InfoItem>
          <Button
            iconType="question_mark"
            className="icon-only"
            onClick={toggleAcademicModal}
          >
            Ver info.
          </Button>
        </div>
        <a
          href={`https://orcid.org/${accessRequest.orcid}`}
          style={{ fontWeight: 600 }}
          target="_blank"
        >
          <InfoItem
            label={accessRequest.orcid}
            iconType={<ORCIDIcon />}
          ></InfoItem>
        </a>

        <a href={`mailto:${accessRequest.email}`}>
          <InfoItem label={accessRequest.email} iconType={"email"}></InfoItem>
        </a>
        <InfoItem
          fullheight
          label={accessRequest.about}
          iconType={"message"}
        ></InfoItem>
      </div>
    </div>
  );
}
