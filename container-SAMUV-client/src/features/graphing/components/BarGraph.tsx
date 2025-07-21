import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import TooltipContent from "./TooltipContent";

// import "../../../app/App.css";

import testData from "../stores/testData";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { IGraphData } from "../util/specimenSorter";

interface IBarGraph {
  yLabel: string;
  xLabel: string;
  data: IGraphData[];
}
export default function BarGraph({
  yLabel = "yLabel",
  xLabel = "xLabel",
  data,
}: IBarGraph) {
  return (
    <div className="w-100 h-100">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"flex-row h-100 p1"}
      >
        <BarChart
          width={500}
          height={300}
          data={data ?? testData}
          cx="50%"
          cy="50%"
          margin={{
            top: 50,
            right: 40,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            padding={{ left: 20, right: 20 }}
            label={{ value: xLabel, position: "insideBottom", offset: -10 }}
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />
          <Tooltip
            content={(content) => (
              <TooltipContent
                payload={(content.payload ?? []) as Payload<number, string>[]}
                label={content.label}
              />
            )}
          />

          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
