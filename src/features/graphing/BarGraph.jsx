import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import testData from "./TestData";

export default function BarGraph({
  yLabel = "yLabel",
  xLabel = "xLabel",
  data = null,
}) {
  return (
    <ResponsiveContainer width="80%" height="80%">
      <BarChart
        width={500}
        height={300}
        data={data ?? testData}
        cx="50%"
        cy="50%"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{ value: xLabel, position: "insideBottom", offset: 0 }}
        />
        <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
        <Tooltip />

        <Bar
          dataKey="value"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
