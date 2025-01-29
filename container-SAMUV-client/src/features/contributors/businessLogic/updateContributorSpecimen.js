import { apiWrapper } from "../../../dataAccess/apiClient";
import { CONTRIBUTORS_SPECIMEN_URL } from "./contributorsURL";

/*
This is a non-hook version of the m ethod found in useContributorsAndRoles. We need this one to
allow contributor editing in EditableContributorCell.
The hook version of this method triggers rerenders of the EditableContributorCell
which makes editing of that cell impossible, hence this non-hook version.
*/
const updateContributorSpecimen = async (contributorSpecimen) => {
  const data = {
    "id": contributorSpecimen.id,
		"contributor": contributorSpecimen.contributor_id,
		"contributor_role": contributorSpecimen.contributor_role_id,
	}
  await apiWrapper.put(`${CONTRIBUTORS_SPECIMEN_URL}/${data.id}/`, data);
}

export default updateContributorSpecimen;