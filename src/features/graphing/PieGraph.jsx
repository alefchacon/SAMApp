import { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

import TooltipCustom from "./TooltipCustom";

export default function PieGraph({ data }) {
  const [_data, setData] = useState(data);

  const [hoveredSlice, setHoveredSlice] = useState(null);

  useEffect(() => {
    setData(data);
  }, [data]);

  useEffect(() => {
    if (!hoveredSlice) {
      setData(data);
      return;
    }

    hightlightSlice();
  }, [hoveredSlice]);

  function hightlightSlice() {
    const { name } = hoveredSlice;

    const updatedData = _data.map((item) => {
      if (item.name !== name) {
        return { ...item, opacity: 0.2 };
      }
      return item;
    });

    setData(updatedData);
  }

  const handleMouseEnter = (slice) => {
    setData(data);
    setHoveredSlice(slice);
  };
  const handleMouseLeave = () => {
    setHoveredSlice(null);
  };
  return (
    <ResponsiveContainer width="100%" height="95%">
      <PieChart>
        <Pie
          dataKey="value"
          nameKey="name"
          isAnimationActive={false}
          data={_data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <Tooltip content={<TooltipCustom />} />
        <Legend
          onMouseEnter={(o) => handleMouseEnter(o.payload)}
          onMouseLeave={handleMouseLeave}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
