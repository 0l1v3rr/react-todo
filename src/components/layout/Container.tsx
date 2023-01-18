import { ReactElement, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactElement | ReactElement[];
  className?: string;
}

const Container: FC<ContainerProps> = (props) => {
  return (
    <section
      className={twMerge(
        "w-full bg-gray-800 border-2 border-gray-700 rounded shadow-sm flex flex-col gap-2",
        props.className
      )}
    >
      {props.children}
    </section>
  );
};

export default Container;
