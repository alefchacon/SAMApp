import React, { useEffect, useState } from "react";
import { BarChartCustom } from "@/components/ui/BarChart";
import { LineChartCustom } from "@/components/ui/LineChart";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";
import { IMetrics } from "../domain/model/Metrics";
import { Card } from "@/components/ui/Card";
import Map from "@/features/mapping/components/Map";
import Specimen from "../domain/model/Specimen";
import { UserRoles } from "@/stores/EUserRoles";
interface ISpecimenMetricsProps {
  taxonName: string;
  specimens?: Specimen[];
}
export default function SpecimenMetrics({
  taxonName,
  specimens,
}: ISpecimenMetricsProps) {
  const [metrics, setMetrics] = useState<IMetrics>();
  const [mapSpecimens, setMapSpecimens] = useState<Specimen>();
  const { getMetricsByTaxonName } = useSpecie();
  useEffect(() => {
    getMetricsByTaxonName(taxonName).then((metrics) => {
      setMetrics(metrics);
    });
    if (!specimens) {
      // alert("fetching specimens for map");
    }
  }, [taxonName]);

  if (!metrics) {
    return <></>;
  }

  return (
    <div className="metrics flex flex-col gap-5 h-100">
      <Card className="flex-1 p-0 overflow-hidden">
        <Map specimens={metrics.specimens}></Map>
      </Card>
      <div className="flex flex-col lg:flex-row gap-5 flex-1 min-h-30">
        <BarChartCustom
          data={metrics?.specimens_by_month}
          xDataKey="month"
          yDataKey="count"
        ></BarChartCustom>
        <LineChartCustom
          data={metrics?.specimens_by_year}
          xDataKey="year"
          yDataKey="count"
        ></LineChartCustom>
      </div>
    </div>
  );
}
