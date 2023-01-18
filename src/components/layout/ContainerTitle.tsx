import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerTitleProps {
  text: string;
  className?: string;
}

const ContainerTitle: FC<ContainerTitleProps> = (props) => {
  return (
    <div
      className={twMerge(
        "text-lg font-semibold text-gray-100 leading-none mx-1",
        props.className
      )}
    >
      {props.text}
    </div>
  );
};

export default ContainerTitle;
