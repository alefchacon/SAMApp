import { useState, useEffect } from "react";

import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";

import Button from "../../components/ui/Button";

import testData from "./TestData";

const PIE_GRAPH_KEY = 1;
const BAR_GRAPH_KEY = 2;

export default function Multigraph({ data, graphTitle = "Graph title" }) {
  const [currentGraphKey, setCurrentGraphKey] = useState(PIE_GRAPH_KEY);

  const handleGraphSwitch = (graphKey = PIE_GRAPH_KEY) => {
    setCurrentGraphKey(graphKey);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex-col">
      <div className="graph-title flex-row p-1rem justify-content-space-between align-items-center">
        <p>{graphTitle}</p>
        <div className="flex-row">
          <Button
            className="only-icon selectable"
            iconType="pie_chart"
            onClick={() => handleGraphSwitch(PIE_GRAPH_KEY)}
          />
          <Button
            className="only-icon selectable"
            iconType="bar_chart"
            onClick={() => handleGraphSwitch(BAR_GRAPH_KEY)}
          />
        </div>
      </div>
      <div
        className="flex-row rounded-20 bg-white w-100 h-100"
        style={{ minHeight: "400px" }}
      >
        {currentGraphKey === PIE_GRAPH_KEY && <PieGraph data={data} />}
        {currentGraphKey === BAR_GRAPH_KEY && <BarGraph data={data} />}
      </div>
    </div>
  );
}
