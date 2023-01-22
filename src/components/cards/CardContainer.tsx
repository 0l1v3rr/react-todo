import { FC } from "react";
import { TransferData } from "../../types/dataTransfer";
import { Label, Task, TaskStatus } from "../../types/task";
import Container from "../layout/Container";
import ContainerTitle from "../layout/ContainerTitle";
import Flex from "../layout/Flex";
import AddCard from "./AddCard";
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";

interface CardContainerProps {
  tasks: Task[];
  labels: Label[];
  status: TaskStatus;
  draggedData?: TransferData;
  setDraggedData: (data: TransferData | undefined) => void;
  newTask: (task: Task) => void;
  editTask: (id: string, task: Task) => void;
  shiftTasks: (toStatus: TaskStatus, taskId: Task["id"], index: number) => void;
}

const CardContainer: FC<CardContainerProps> = ({
  tasks,
  status,
  newTask,
  editTask,
  labels,
  draggedData,
  setDraggedData,
  shiftTasks,
}) => {
  return (
    <Container className="px-4 py-2 gap-0">
      <ContainerTitle text={status} />

      <CardPlaceholder
        draggedData={draggedData}
        status={status}
        index={-1}
        setDraggedData={setDraggedData}
        shiftTasks={shiftTasks}
      />

      <Flex className="flex-col gap-0">
        {tasks.map((task, i) => (
          <div className="flex flex-col gap-0 w-full" key={task.id}>
            <Card
              task={task}
              editTask={editTask}
              labels={labels}
              index={i}
              setDraggedData={(data) => setDraggedData(data)}
            />

            <CardPlaceholder
              draggedData={draggedData}
              status={status}
              index={i}
              setDraggedData={setDraggedData}
              shiftTasks={shiftTasks}
            />
          </div>
        ))}
      </Flex>

      <AddCard newTask={newTask} status={status} />
    </Container>
  );
};

export default CardContainer;
