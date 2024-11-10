import Contributor from "../domain/contributor";
import { CONTRIBUTORS_URL } from "./contributorsURL";
import { apiWrapper } from "../../../dataAccess/apiClient";

const getContributors =async () => {
  const response = await apiWrapper.get(CONTRIBUTORS_URL);
  return response.data.map(
    (contributor) => new Contributor(contributor)
  );
};

export default getContributors;