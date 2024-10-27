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

import TooltipGraph from "./TooltipGraph";

import "../../../app/App.css";

import testData from "../stores/testData";

export default function BarGraph({
  yLabel = "yLabel",
  xLabel = "xLabel",
  data = null,
}) {
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
            padding={20}
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
          <Tooltip content={<TooltipGraph />} />

          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
