import { useState, useEffect } from "react";

import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import DATE_TYPES from "../stores/dateTypes";
import { sortByDate } from "../util/specimenSorter";

const PIE_GRAPH_KEY = 1;
const BAR_GRAPH_KEY = 2;
const LINE_GRAPH_KEY = 3;

export default function Multigraph({
  specimens,
  attributeToGraph = {
    name: "colection_date",
    type: DATE_TYPES.MONTH,
  },

  graphTitle = "Graph title",
  yLabel = "yLabel",
  xLabel = "xLabel",
}) {
  const [data, setData] = useState();
  const [lineOnly, setLineOnly] = useState(false);
  const [currentGraphKey, setCurrentGraphKey] = useState(PIE_GRAPH_KEY);

  const handleGraphSwitch = (graphKey = PIE_GRAPH_KEY) => {
    setCurrentGraphKey(graphKey);
  };

  useEffect(() => {
    sortByDate(specimens, attributeToGraph.name, attributeToGraph.type).then(
      (graphData) => {
        setData(graphData);
        const lineOnly = graphData.length > 20;
        setLineOnly(lineOnly);
        setCurrentGraphKey(lineOnly ? LINE_GRAPH_KEY : PIE_GRAPH_KEY);
      }
    );
  }, [specimens]);

  return (
    <div className="flex-col">
      <div className="graph-title flex-row p-1rem justify-content-space-between align-items-center">
        <p>{graphTitle}</p>
        <div className="flex-row">
          {!lineOnly && (
            <>
              <Button
                className="only-icon selectable"
                iconType="pie_chart"
                onClick={() => handleGraphSwitch(PIE_GRAPH_KEY)}
              />
              <Button
                className="only-icon selectable"
                iconType="bar_chart"
                onClick={() => handleGraphSwitch(BAR_GRAPH_KEY)}
              ></Button>
            </>
          )}
          <Button
            className="only-icon selectable"
            iconType="show_chart"
            onClick={() => handleGraphSwitch(LINE_GRAPH_KEY)}
          />
        </div>
      </div>
      <Card className={"multigraph align-items-center justify-content-center"}>
        {currentGraphKey === PIE_GRAPH_KEY && !lineOnly && (
          <PieGraph data={data} />
        )}
        {currentGraphKey === BAR_GRAPH_KEY && !lineOnly && (
          <BarGraph data={data} xLabel={xLabel} yLabel={yLabel} />
        )}
        {currentGraphKey === LINE_GRAPH_KEY && (
          <LineGraph xLabel={xLabel} yLabel={yLabel} initialData={data} />
        )}
      </Card>
    </div>
  );
}
