import { FC } from "react";
import { Label } from "../../types/task";

interface LabelProps {
  label: Label;
}

const LabelItem: FC<LabelProps> = ({ label }) => {
  return (
    <div
      style={{
        borderColor: label.color,
        backgroundColor: `${label.color}33`,
      }}
      className="border border-solid rounded-full leading-none 
        pl-1 pr-2 py-0.5 text-sm text-gray-100 flex items-center 
        justify-center gap-1 select-none"
    >
      <div
        className="h-3 w-3 rounded-full"
        style={{
          backgroundColor: label.color,
        }}
      />
      <span>{label.text}</span>
    </div>
  );
};

export default LabelItem;
