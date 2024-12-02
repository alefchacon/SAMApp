import React, { useState, useEffect } from "react";
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

import TooltipGraph from "./TooltipGraph";

import Button from "../../../components/ui/Button";

import testData from "../stores/testData";

import "../../../app/App.css";

export default function LineGraph({ initialData = testData }) {
  const initialState = {
    data: initialData,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    animation: true,
  };

  useEffect(() => {
    setState((previousState) => ({
      ...previousState,
      data: initialData,
      left: "dataMin",
      right: "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      top: "dataMax+1",
      bottom: "dataMin-1",
    }));
  }, [initialData]);

  const getAxisYDomain = (from, to, ref, offset) => {
    let fromIndex = initialData.findIndex((data) => data.name === from);
    let toIndex = initialData.findIndex((data) => data.name === to);

    if (fromIndex > toIndex) {
      let index = fromIndex;
      fromIndex = toIndex;
      toIndex = index;
    }
    const refData = initialData.slice(fromIndex, toIndex);

    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  const [state, setState] = useState(initialState);

  const zoom = () => {
    let { refAreaLeft, refAreaRight, data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setState((previousState) => ({
        ...previousState,
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "value", 1);

    setState((previousState) => ({
      ...previousState,
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  };

  const zoomOut = () => {
    const { data } = state;
    setState((previousState) => ({
      ...previousState,
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin",
    }));
  };

  const { data, left, right, refAreaLeft, refAreaRight, top, bottom } = state;

  const nameIsNumber = typeof data[0].name === "number";

  return (
    <div
      className="highlight-bar-charts user-select-none flex-col w-100 align-items-end justify-content-right"
    >
      <div className="p-1rem">
        <Button className="secondary" iconType="zoom_out" onClick={zoomOut}>
          Alejar
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={"100%"}
          height={400}
          data={data}
          onMouseDown={(e) =>
            setState((previousState) => ({
              ...previousState,
              refAreaLeft: e.activeLabel,
            }))
          }
          onMouseMove={(e) =>
            state.refAreaLeft &&
            setState((previousState) => ({
              ...previousState,
              refAreaRight: e.activeLabel,
            }))
          }
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
            type={nameIsNumber ? "number" : "category"}
            min={0}
            tickFormatter={nameIsNumber ? (value) => Math.floor(value) : ""}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            min={0}
            tickFormatter={(value) => Math.floor(value)}
          />

          <Tooltip content={<TooltipGraph />} />
          <Line
            yAxisId="1"
            type="linear"
            dataKey="value"
            stroke="var(--uv-green)"
            animationDuration={300}
          />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
