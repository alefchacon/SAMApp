import InfoItem from "../../../components/ui/InfoItem";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import Button from "../../../components/ui/Button";
import LOREM_IPSUM from "../../../stores/loremIpsum";

export default function AccessRequest({
  fullheight = true,
  accessRequest = {
    orcid: "0000-0000-0000-0000",
    email: "email@email.com",
    about: LOREM_IPSUM.LONG,
  },
}) {
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
          fullheight={fullheight}
          label={accessRequest.about}
          iconType={"message"}
        ></InfoItem>
      </div>
    </div>
  );
}
