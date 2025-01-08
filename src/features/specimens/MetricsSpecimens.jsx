import Multigraph from "../graphing/Multigraph";

export default function MetricsSpecimens({ specimens }) {
  return (
    <div className="p-1rem gap-1rem h-100 multigraph-wrapper">
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.MONTH }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
      <Multigraph
        graphTitle="Especímenes recolectados por año"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.YEAR }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.MONTH }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.MONTH }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.MONTH }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.MONTH }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        specimens={specimens}
        attributeToGraph={{ name: "colection_date", type: DATE_TYPES.MONTH }}
        yLabel="Especímenes"
        xLabel="Meses"
      />
    </div>
  );
}
