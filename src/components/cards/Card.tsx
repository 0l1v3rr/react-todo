import { FC, useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Task } from "../../types/task";
import LabelItem from "./LabelItem";
import { HiOutlinePencil } from "react-icons/hi";
import Button from "../layout/Button";
import { useOuterClick } from "../../hooks/useOuterClick";

interface CardProps {
  task: Task;
  editTask: (id: string, task: Task) => void;
}

type CardStatus = "normal" | "edit";

const Card: FC<CardProps> = ({ task, editTask }) => {
  const [status, setStatus] = useState<CardStatus>("normal");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useOuterClick(() => setStatus("normal"));

  return (
    <article className="flex items-stretch w-full shadow-card group">
      <div
        ref={containerRef}
        className="flex flex-col gap-1 bg-gray-700 border-2 
          border-gray-600 border-r-0 rounded-tl-sm rounded-bl-sm 
          w-full select-none py-2"
      >
        {task.labels.length > 0 && (
          <div className="flex items-start gap-1 pl-2 pr-1">
            <div className="flex items-center justify-start gap-1 w-full flex-wrap">
              {task.labels.map((label) => (
                <LabelItem label={label} key={label.id} />
              ))}
            </div>

            {status === "normal" && (
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
            )}
          </div>
        )}

        {status === "normal" && (
          <div className="px-2 text-gray-200">{task.title}</div>
        )}

        {status === "edit" && (
          <>
            <textarea
              ref={textAreaRef}
              rows={3}
              autoComplete="off"
              defaultValue={task.title}
              autoFocus={true}
              className="mx-2 px-1 text-gray-200 outline-none rounded-sm
                bg-gray-800 border-2 border-gray-600 resize-none
                focus:border-gray-500 active:border-gray-500 transition-all
                duration-150 textarea-scrollbar shadow-card"
            />

            <div className="flex items-center gap-2 mx-2 text-sm">
              <Button
                variant="primary"
                label="Save"
                onClick={() => {
                  editTask(task.id, {
                    ...task,
                    title: textAreaRef.current?.value || "",
                  });
                  setStatus("normal");
                }}
              />
              <Button
                variant="secondary"
                label="Cancel"
                onClick={() => setStatus("normal")}
              />
            </div>
          </>
        )}
      </div>

      <div
        className={twMerge(
          "w-4 border-r-4 rounded-tr-sm rounded-br-sm cursor-grab",
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
