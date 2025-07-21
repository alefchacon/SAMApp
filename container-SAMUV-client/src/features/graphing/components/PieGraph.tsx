import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import TooltipContent from "./TooltipContent";
import { IGraphData } from "../util/specimenSorter";

interface ISlice {
  name: string;
}

interface IPieGraphProps {
  initialData: IGraphData[];
}

export default function PieGraph({ initialData }: IPieGraphProps) {
  const [data, setData] = useState(initialData);

  const [hoveredSlice, setHoveredSlice] = useState<ISlice | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!hoveredSlice) {
      setData(initialData);
      return;
    }

    hightlightSlice();
  }, [hoveredSlice]);

  function hightlightSlice() {
    if (!hoveredSlice) {
      return;
    }

    const { name } = hoveredSlice;

    const updatedData = data.map((item) => {
      if (item.name !== name) {
        return { ...item, opacity: 0.2 };
      }
      return item;
    });

    setData(updatedData);
  }

  const handleMouseEnter = (slice: any) => {
    setData(initialData);
    setHoveredSlice(slice);
  };
  const handleMouseLeave = () => {
    setHoveredSlice(null);
  };
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          dataKey="value"
          nameKey="name"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <Tooltip
          content={(content) => (
            <TooltipContent
              payload={(content.payload ?? []) as Payload<number, string>[]}
              label={content.label}
            />
          )}
        />
        <Legend
          onMouseEnter={(o) => handleMouseEnter(o.payload)}
          onMouseLeave={handleMouseLeave}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
