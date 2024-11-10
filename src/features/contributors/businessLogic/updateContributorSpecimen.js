import { apiWrapper } from "../../../dataAccess/apiClient";
import { CONTRIBUTORS_SPECIMEN_URL } from "./contributorsURL";
const updateContributorSpecimen = async (contributorSpecimen) => {
  const data = {
    "id": contributorSpecimen.id,
		"contributor": contributorSpecimen.contributor_id,
		"contributor_role": contributorSpecimen.contributor_role_id,
	}
  await apiWrapper.put(`${CONTRIBUTORS_SPECIMEN_URL}/${data.id}/`, data);
}

export default updateContributorSpecimen;