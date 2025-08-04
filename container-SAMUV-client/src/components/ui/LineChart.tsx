"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { IMetric } from "@/features/specimens/domain/model/Metrics";

export const description = "A linear line chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface IBarChartCustomProps {
  data: IMetric[];
  xDataKey: string;
  yDataKey: string;
}
export function LineChartCustom({
  data,
  xDataKey,
  yDataKey,
}: IBarChartCustomProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Especímenes por año</CardTitle>
      </CardHeader>
      <CardContent className="h-100 w-100">
        <ChartContainer config={chartConfig} className="h-65 w-100">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={yDataKey}
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
