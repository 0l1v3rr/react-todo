import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Task } from "../../types/task";
import LabelItem from "./LabelItem";
import { HiOutlinePencil } from "react-icons/hi";

interface CardProps {
  task: Task;
}

const Card: FC<CardProps> = ({ task }) => {
  return (
    <article className="flex items-stretch w-full shadow-card group">
      <div
        className="flex flex-col gap-2 bg-gray-700 border-2 
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

            <button
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

        <div className="px-2 text-gray-200 text-justify">{task.title}</div>
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
