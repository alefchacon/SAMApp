import { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import colors from "../../features/graphing/Colors";
import testData from "../../features/graphing/TestData";

export default function PieGraph({ data }) {
  const [_data, setData] = useState(data);

  const [hoveredSlice, setHoveredSlice] = useState(null);

  useEffect(() => {
    console.log(_data);
    _data.map((item) => {
      item.fill = colors[Math.floor(Math.random() * colors.length)];
    });
  }, []);

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
    <ResponsiveContainer width="100%" height="100%" className={"p-1rem"}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={_data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <Tooltip />
        <Legend
          onMouseEnter={(o) => handleMouseEnter(o.payload)}
          onMouseLeave={handleMouseLeave}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
