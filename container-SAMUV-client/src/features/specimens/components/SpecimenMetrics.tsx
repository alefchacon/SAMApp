import React, { useEffect, useState } from "react";
import { BarChartCustom } from "@/components/ui/BarChart";
import { LineChartCustom } from "@/components/ui/LineChart";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";
import { IMetrics } from "../domain/model/Metrics";

interface ISpecimenMetricsProps {
  taxonName: string;
}
export default function SpecimenMetrics({ taxonName }: ISpecimenMetricsProps) {
  const [metrics, setMetrics] = useState<IMetrics>();
  const { getMetricsByTaxonName } = useSpecie();
  useEffect(() => {
    getMetricsByTaxonName(taxonName).then((metrics) => {
      setMetrics(metrics);
    });
  }, [taxonName]);

  if (!metrics) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-blue-500 rounded-xl flex-1 min-h-60">asdf</div>
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
