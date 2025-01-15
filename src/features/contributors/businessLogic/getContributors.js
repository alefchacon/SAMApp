import Contributor from "../domain/contributor";
import { CONTRIBUTORS_URL } from "./contributorsURL";
import { apiWrapper } from "../../../dataAccess/apiClient";

/*
This is a non-hook version of the m ethod found in useContributorsAndRoles. We need this one to
allow contributor fetching in EditableContributorCell.
The hook version of this method triggers rerenders of the EditableContributorCell
which makes editing of that cell impossible, hence this non-hook version.
*/
const getContributors =async () => {
  const response = await apiWrapper.get(CONTRIBUTORS_URL);
  return response.data.map(
    (contributor) => new Contributor(contributor)
  );
};

export default getContributors;