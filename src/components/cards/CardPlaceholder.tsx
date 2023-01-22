import { useState, FC, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { TransferData } from "../../types/dataTransfer";
import { Task, TaskStatus } from "../../types/task";

interface CardPlaceholderProps {
  draggedData?: TransferData;
  setDraggedData: (data: TransferData | undefined) => void;
  status: TaskStatus;
  index: number;
  shiftTasks: (
    toStatus: TaskStatus,
    taskId: Task["id"],
    index: number,
    originalIndex: number
  ) => void;
}

const CardPlaceholder: FC<CardPlaceholderProps> = (props) => {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (
        props.status === props.draggedData?.status &&
        (props.index === props.draggedData.index ||
          props.index === props.draggedData.index - 1)
      ) {
        return;
      }

      setIsDraggedOver(true);
    },
    [props]
  );

  const handleDrop = useCallback(() => {
    props.shiftTasks(
      props.status,
      props.draggedData?.task.id || "0",
      props.index,
      props.draggedData?.index || 0
    );

    props.setDraggedData(undefined);
    setIsDraggedOver(false);
  }, [props]);

  const calculateHeight = useCallback((): string => {
    if (isDraggedOver) {
      if (props.draggedData === undefined) {
        return "0.5rem";
      }

      return `${16 + props.draggedData.height}px`;
    }

    return props.draggedData?.index === props.index &&
      props.status === props.draggedData.status
      ? "0"
      : "0.5rem";
  }, [props, isDraggedOver]);

  return (
    <div
      onDragEnter={handleDragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDragOver={(e: React.DragEvent) => e.preventDefault()}
      onDrop={handleDrop}
      className={twMerge("w-full z-10", isDraggedOver ? "py-2" : "")}
      style={{
        height: calculateHeight(),
      }}
    >
      <div
        className={twMerge(
          "pointer-events-none select-none",
          isDraggedOver
            ? "bg-gray-900 rounded-sm border-2 border-gray-700 shadow-card px-2 block"
            : "hidden"
        )}
        style={{
          height: props.draggedData?.height || "4rem",
        }}
      />
    </div>
  );
};

export default CardPlaceholder;
