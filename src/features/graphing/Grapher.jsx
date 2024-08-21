import { useState } from "react";

import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";

import Button from "../../components/ui/Button";

import testData from "./TestData";

export default function Grapher({ graphTitle = "Graph title" }) {
  const graphs = {
    1: <PieGraph data={testData} />,
    2: <BarGraph data={testData} />,
  };

  const [currentGraph, setCurrentGraph] = useState(graphs[1]);

  const handleGraphSwitch = (graphKey = 1) => {
    setCurrentGraph(graphs[graphKey]);
  };

  return (
    <div className="flex-col w-100">
      <div className="graph-title flex-row p-1rem justify-content-space-between align-items-center">
        <p>{graphTitle}</p>
        <div className="flex-row gap-1rem">
          <Button
            className="secondary"
            iconType="pie_chart"
            onClick={() => handleGraphSwitch(1)}
          />
          <Button
            className="secondary"
            iconType="bar_chart"
            onClick={() => handleGraphSwitch(2)}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        {currentGraph}
      </div>
    </div>
  );
}
