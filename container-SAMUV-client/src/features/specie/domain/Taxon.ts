import { FrontendSpecieParams } from "@/routing/FrontendRoutes";

export interface ITaxon {
  taxon_name: string;
  rank_name: FrontendSpecieParams;
  parent_ranks?: ITaxon[];
  children_ranks?: ITaxon[];
  specimen_count?: number;
}
