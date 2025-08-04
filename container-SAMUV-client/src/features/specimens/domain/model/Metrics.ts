import Specimen from "./Specimen";

export interface IMetric {
  year?: number;
  month?: number;
  count: number;
}

export interface IMetrics {
  specimens_by_month: IMetric[];
  specimens_by_year: IMetric[];
  specimens: Specimen[];
}
