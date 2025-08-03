import FrontendRoutes, { FrontendSearchParams } from "@/routing/FrontendRoutes";
import { useNavigate } from "react-router-dom";

function useSearch() {
  const navigate = useNavigate();
  const search = async (query: string): Promise<void> => {
    navigate(
      `/${FrontendRoutes.SPECIES}?${FrontendSearchParams.SEARCH_QUERY}=${query}`
    );
  };

  return { search };
}

export default useSearch;
