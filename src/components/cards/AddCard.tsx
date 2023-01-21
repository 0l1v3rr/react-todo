import { FC, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useOuterClick } from "../../hooks/useOuterClick";
import { Task, TaskStatus } from "../../types/task";
import Button from "../layout/Button";
import ResizeTextarea from "react-textarea-autosize";

type Status = "normal" | "edit";

interface AddCardProps {
  newTask: (task: Task) => void;
  status: TaskStatus;
}

const AddCard: FC<AddCardProps> = (props) => {
  const [status, setStatus] = useState<Status>("normal");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useOuterClick(() => setStatus("normal"));

  return (
    <>
      {status === "normal" && (
        <div
          onClick={() => setStatus("edit")}
          className="flex items-center justify-start cursor-pointer px-2 py-1 text-gray-400 
          hover:bg-gray-700 border-2 border-gray-700 rounded-sm shadow-card gap-2
          hover:border-gray-600 transition-all duration-150 hover:text-gray-200 select-none"
        >
          <AiOutlinePlus />
          <span>Add card</span>
        </div>
      )}

      {status === "edit" && (
        <div
          ref={containerRef}
          className="flex items-center flex-col w-full gap-2"
        >
          <ResizeTextarea
            ref={textAreaRef}
            minRows={3}
            maxRows={10}
            autoComplete="off"
            defaultValue=""
            placeholder="Enter a title for this card..."
            autoFocus={true}
            className="px-1 text-gray-200 outline-none rounded-sm
              bg-gray-800 border-2 border-gray-600 resize-none
              focus:border-gray-500 active:border-gray-500 transition-colors
              duration-150 textarea-scrollbar shadow-card w-full placeholder:text-gray-500"
          />

          <div className="flex items-center gap-2 text-sm w-full">
            <Button
              variant="primary"
              label="Save"
              onClick={() => {
                props.newTask({
                  id: "0",
                  labels: [],
                  position: 1,
                  status: props.status,
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
        </div>
      )}
    </>
  );
};

export default AddCard;
