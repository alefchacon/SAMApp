import React, { useState, useEffect } from "react";

import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import Button from "../../../components/ui/ButtonCustom";
import Card from "@/components/ui/Card";
import DATE_TYPES, { DateTypes } from "../stores/dateTypes";
import Specimen from "@/features/specimens/domain/model/Specimen";
import { IGraphData, sortByDate } from "../util/specimenSorter";

const PIE_GRAPH_KEY = 1;
const BAR_GRAPH_KEY = 2;
const LINE_GRAPH_KEY = 3;

interface IGraphType {
  name: string;
  type: DateTypes;
}

interface IMultigraphProps {
  specimens: Specimen[];
  graphTitle: string;
  yLabel: string;
  xLabel: string;
  attributeToGraph: IGraphType;
}

export default function Multigraph({
  specimens,
  attributeToGraph = {
    name: "colection_date",
    type: DateTypes.MONTH,
  },
  graphTitle = "Graph title",
  yLabel = "yLabel",
  xLabel = "xLabel",
}: IMultigraphProps) {
  const [data, setData] = useState<IGraphData[]>();
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

  if (!data) {
    return <></>;
  }

  return (
    <div className="flex-col">
      <div className="graph-title flex-row p-1rem justify-content-space-between align-items-center">
        <p>{graphTitle}</p>
        <div className="flex-row">
          {!lineOnly && (
            <>
              <button
                className="only-icon selectable"
                onClick={() => handleGraphSwitch(PIE_GRAPH_KEY)}
              />
              <button
                className="only-icon selectable"
                onClick={() => handleGraphSwitch(BAR_GRAPH_KEY)}
              ></button>
            </>
          )}
          <button
            className="only-icon selectable"
            onClick={() => handleGraphSwitch(LINE_GRAPH_KEY)}
          />
        </div>
      </div>
      <Card className={"multigraph align-items-center justify-content-center"}>
        <>
          {currentGraphKey === PIE_GRAPH_KEY && !lineOnly && (
            <PieGraph initialData={data} />
          )}
          {currentGraphKey === BAR_GRAPH_KEY && !lineOnly && (
            <BarGraph data={data!} xLabel={xLabel} yLabel={yLabel} />
          )}
          {currentGraphKey === LINE_GRAPH_KEY && (
            <LineGraph initialData={data!} />
          )}
        </>
      </Card>
    </div>
  );
}
