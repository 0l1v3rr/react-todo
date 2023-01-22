import React, { FC, useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Label, Task } from "../../types/task";
import LabelItem from "./LabelItem";
import { HiOutlinePencil } from "react-icons/hi";
import Button from "../layout/Button";
import { useOuterClick } from "../../hooks/useOuterClick";
import ResizeTextarea from "react-textarea-autosize";
import { TransferData } from "../../types/dataTransfer";

interface CardProps {
  task: Task;
  editTask: (id: string, task: Task) => void;
  labels: Label[];
  setDraggedData: (data: TransferData | undefined) => void;
  index: number;
}

type CardStatus = "normal" | "edit";

const Card: FC<CardProps> = ({
  task,
  editTask,
  labels,
  setDraggedData,
  index,
}) => {
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<CardStatus>("normal");
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>(() => {
    return task.labels.map((label) => label.id);
  });

  const cancel = () => {
    setStatus("normal");
    setSelectedLabelIds(task.labels.map((label) => label.id));
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useOuterClick(() => cancel());

  useEffect(
    () => setSelectedLabelIds(task.labels.map((label) => label.id)),
    [task]
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();

    const { left, top } = e.currentTarget.getBoundingClientRect();
    e.dataTransfer.setDragImage(
      e.currentTarget,
      e.clientX - left,
      e.clientY - top
    );

    const data: TransferData = {
      height: e.currentTarget.clientHeight,
      status: task.status,
      task,
      index,
    };

    e.dataTransfer.setData("application/json", JSON.stringify(data));
    setDraggedData(data);

    setTimeout(() => setIsDragged(true), 0);
  };

  return (
    <article
      ref={ref}
      draggable={isDraggable && status === "normal"}
      onDragStart={handleDragStart}
      onDragEnd={() => {
        setIsDragged(false);
        setDraggedData(undefined);
      }}
      className={twMerge(
        "relative items-stretch w-full shadow-card group opacity-100 z-10",
        isDragged ? "hidden" : "flex"
      )}
    >
      <div
        ref={containerRef}
        className="flex flex-col gap-1 bg-gray-700 border-2 
          border-gray-600 border-r-0 rounded-tl-sm rounded-bl-sm 
          w-full select-none py-2"
      >
        {status === "normal" && task.labels.length > 0 && (
          <div className="flex items-start gap-1 pl-2 pr-1">
            <div className="flex items-center justify-start gap-1 w-full flex-wrap">
              {task.labels.map((label) => (
                <LabelItem label={label} key={label.id} variant="normal" />
              ))}
            </div>

            <button
              onClick={() => setStatus("edit")}
              type="button"
              aria-label="Edit"
              className="leading-none text-gray-400 cursor-pointer p-1 
                hover:bg-gray-800/[.25] text-sm rounded-md hover:text-gray-100 
                transition-all duration-100 -translate-y-[7%] opacity-0 group-hover:opacity-100"
            >
              <HiOutlinePencil />
            </button>
          </div>
        )}

        {status === "normal" && (
          <div className="relative">
            <div
              className={twMerge(
                "text-gray-200",
                task.labels.length < 1 ? "pl-2 pr-6" : "px-2"
              )}
            >
              {task.title}
            </div>

            {task.labels.length < 1 && (
              <button
                onClick={() => setStatus("edit")}
                type="button"
                aria-label="Edit"
                className="leading-none text-gray-400 cursor-pointer p-1 
                hover:bg-gray-800/[.25] text-sm rounded-md hover:text-gray-100 
                  transition-all duration-100 opacity-0 right-1 top-0
                  group-hover:opacity-100 absolute"
              >
                <HiOutlinePencil />
              </button>
            )}
          </div>
        )}

        {status === "edit" && (
          <div className="flex flex-col gap-2 px-2">
            <div className="flex items-center justify-start gap-1 w-full flex-wrap">
              {labels.map((label) => (
                <LabelItem
                  label={label}
                  key={label.id}
                  onClick={() => {
                    setSelectedLabelIds((prev) => {
                      if (prev.includes(label.id)) {
                        const idx = prev.findIndex((val) => val === label.id);
                        const newArr = [...prev];

                        newArr.splice(idx, 1);
                        return newArr;
                      }

                      return [...prev, label.id];
                    });
                  }}
                  variant={
                    selectedLabelIds.includes(label.id)
                      ? "normal"
                      : "not-selected"
                  }
                  className="cursor-pointer"
                />
              ))}
            </div>

            <ResizeTextarea
              ref={textAreaRef}
              minRows={1}
              maxRows={10}
              autoComplete="off"
              defaultValue={task.title}
              autoFocus={true}
              className="px-1 text-gray-200 outline-none rounded-sm
                bg-gray-800 border-2 border-gray-600 resize-none
                focus:border-gray-500 active:border-gray-500 transition-colors
                duration-150 textarea-scrollbar shadow-card"
            />

            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="primary"
                label="Save"
                onClick={() => {
                  const taskLabels: Label[] = [];

                  selectedLabelIds.forEach((id) => {
                    const currentLabel = labels.find(
                      (label) => label.id === id
                    );
                    if (currentLabel !== undefined) {
                      taskLabels.push(currentLabel);
                    }
                  });

                  editTask(task.id, {
                    ...task,
                    title: textAreaRef.current?.value || "",
                    labels: taskLabels,
                  });
                  setStatus("normal");
                }}
              />
              <Button
                variant="secondary"
                label="Cancel"
                onClick={() => cancel()}
              />
            </div>
          </div>
        )}
      </div>

      <div
        onMouseEnter={() => setIsDraggable(true)}
        onMouseLeave={() => setIsDraggable(false)}
        className={twMerge(
          "w-4 border-r-4 rounded-tr-sm rounded-br-sm",
          status === "normal" ? "cursor-grab" : "",
          task.status === "To Do" ? "bg-red-500 border-red-600" : "",
          task.status === "In Progress"
            ? "bg-yellow-500 border-yellow-600"
            : "",
          task.status === "Done" ? "bg-green-500 border-green-600" : ""
        )}
      />
    </article>
  );
};

export default Card;
