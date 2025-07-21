import React from "react";
import { ContentType } from "recharts/types/component/Tooltip";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface ITooltipContentProps {
  label?: string | React.ReactElement | null;
  payload: Payload<number, string>[] | undefined;
}
export default function TooltipContent(props: ITooltipContentProps) {
  const { label = null, payload } = props;
  const name = payload![0]?.name;
  const value = payload![0]?.value;
  return (
    <div className="bg-black-transparent rounded-5 p-1rem shadow-all flex-col  color-white">
      <p className="flex-row h-100">
        <b>{label ?? name}</b>
      </p>
      <p>
        {value} {value === 1 ? "espécimen" : "especímenes"}
      </p>
    </div>
  );
}
