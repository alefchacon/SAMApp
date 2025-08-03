export interface IRank {
  rank_name: string;
  taxon_name: string;
  children_ranks?: IRank[];
  parent_ranks?: IRank[];
  // frontend only:
  indexInSelection?: number;
}
