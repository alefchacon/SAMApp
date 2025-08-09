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

import TooltipContent from "./TooltipContent";

import Button from "../../../components/ui/ButtonCustom";
import Specimen from "@/features/specimens/domain/model/Specimen";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { IGraphData } from "../util/specimenSorter";

type ZoomState = {
  data: IGraphData[];
  left: string;
  right: string;
  refAreaLeft: string;
  refAreaRight: string;
  top: string | number;
  bottom: string | number;
  animation: boolean;
};

interface ILineGraphProps {
  initialData: IGraphData[];
}

export default function LineGraph({ initialData }: ILineGraphProps) {
  const initialState: ZoomState = {
    data: initialData,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    animation: true,
  };
  const [state, setState] = useState<ZoomState>(initialState);

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

  const getAxisYDomain = (
    from: string,
    to: string,
    ref: string,
    offset: number
  ) => {
    let fromIndex = initialData.findIndex((data) => data.name === from);
    let toIndex = initialData.findIndex((data) => data.name === to);

    if (fromIndex > toIndex) {
      let index = fromIndex;
      fromIndex = toIndex;
      toIndex = index;
    }
    const refData = initialData.slice(fromIndex, toIndex);

    let [bottom, top] = [refData[0].value, refData[0].value];
    refData.forEach((data) => {
      if (data.value > top) {
        top = data.value;
      }
      if (data.value < bottom) {
        bottom = data.value;
      }
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

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

  const nameIsNumber = typeof initialData[0].name === "number";

  return (
    <div className="highlight-bar-chart user-select-none flex-col w-100 align-items-end justify-content-right">
      <div className="p-1rem">
        <button className="secondary" onClick={zoomOut}>
          Alejar
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={100}
          height={400}
          data={data}
          onMouseDown={(e) =>
            setState((previousState) => ({
              ...previousState,
              refAreaLeft: e.activeLabel!,
            }))
          }
          onMouseMove={(e) =>
            state.refAreaLeft &&
            setState((previousState) => ({
              ...previousState,
              refAreaRight: e.activeLabel!,
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
            tickFormatter={
              nameIsNumber ? (value) => String(Math.floor(value)) : () => ""
            }
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            min={0}
            tickFormatter={(value) => String(Math.floor(value))}
          />

          <Tooltip
            content={
              <Tooltip
                content={(content) => (
                  <TooltipContent
                    payload={
                      (content.payload ?? []) as Payload<number, string>[]
                    }
                    label={content.label}
                  />
                )}
              />
            }
          />
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
