import { FC, useMemo } from "react";
import Container from "../components/layout/Container";
import ContainerTitle from "../components/layout/ContainerTitle";
import { twMerge } from "tailwind-merge";

interface MeterProps {
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
}

const Meter: FC<MeterProps> = ({ todoCount, inProgressCount, doneCount }) => {
  const [todo, inProgress, done] = useMemo((): [number, number, number] => {
    const sum = todoCount + inProgressCount + doneCount;

    return [
      (todoCount / sum) * 100,
      (inProgressCount / sum) * 100,
      (doneCount / sum) * 100,
    ];
  }, [todoCount, inProgressCount, doneCount]);

  return (
    <Container className="px-4 py-2">
      <ContainerTitle text="Statistics" />

      <div className="w-full h-4 rounded-sm bg-gray-600 border-2 border-gray-700 relative">
        <div
          className="h-3 bg-red-500 absolute rounded-tl-sm rounded-bl-sm"
          style={{
            width: `${todo}%`,
          }}
        />

        <div
          className={twMerge(
            `h-3 bg-yellow-500 absolute`,
            todo === 0 ? "rounded-tl-sm rounded-bl-sm" : "",
            done === 0 ? "rounded-tr-sm rounded-br-sm" : ""
          )}
          style={{
            width: `${inProgress}%`,
            left: `${todo}%`,
          }}
        />

        <div
          className="h-3 bg-green-500 absolute rounded-tr-sm rounded-br-sm"
          style={{
            width: `${done}%`,
            left: `${todo + inProgress}%`,
          }}
        />
      </div>
    </Container>
  );
};

export default Meter;
