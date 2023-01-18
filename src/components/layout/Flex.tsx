import { ReactElement, FC } from "react";
import { twMerge } from "tailwind-merge";

interface FlexProps {
  children: ReactElement | ReactElement[];
  className?: string;
}

const Flex: FC<FlexProps> = (props) => {
  return (
    <section
      className={twMerge(
        "w-full flex items-center justify-center gap-2",
        props.className
      )}
    >
      {props.children}
    </section>
  );
};

export default Flex;
