import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "../../types/task";

interface LabelProps {
  label: Label;
  variant: "normal" | "not-selected";
  className?: string;
  onClick?: () => void;
}

const LabelItem: FC<LabelProps> = ({ label, variant, ...props }) => {
  return (
    <div
      onClick={() => props.onClick?.()}
      style={{
        borderColor: variant === "normal" ? label.color : `${label.color}75`,
        backgroundColor:
          variant === "normal" ? `${label.color}33` : "transparent",
      }}
      className={twMerge(
        `border border-solid rounded-full leading-none 
          pl-1 pr-2 text-sm flex items-center 
          justify-center gap-1 select-none`,
        variant === "normal" ? "text-gray-50" : "text-gray-400",
        props.className
      )}
    >
      <div
        className="h-3 w-3 rounded-full"
        style={{
          backgroundColor:
            variant === "normal" ? label.color : `${label.color}75`,
        }}
      />
      <span>{label.text}</span>
    </div>
  );
};

export default LabelItem;
