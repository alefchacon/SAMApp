"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

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
} from "@/components/ui/chart";
import { IMetric } from "@/features/specimens/domain/model/Metrics";

export const description = "A bar chart";

interface IBarChartCustomProps {
  data: IMetric[];
  xDataKey: string;
  yDataKey: string;
}
export function BarChartCustom({
  data,
  xDataKey,
  yDataKey,
}: IBarChartCustomProps) {
  if (!data) {
    return <div>nah</div>;
  }
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Especímenes por mes</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xDataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              wrapperClassName="w-fit"
            />
            <Bar dataKey={yDataKey} fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={4}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
