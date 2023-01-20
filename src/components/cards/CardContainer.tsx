import { FC } from "react";
import { Task, TaskStatus } from "../../types/task";
import Container from "../layout/Container";
import ContainerTitle from "../layout/ContainerTitle";
import AddCard from "./AddCard";
import Card from "./Card";

interface CardContainerProps {
  tasks: Task[];
  status: TaskStatus;
  newTask: (task: Task) => void;
  editTask: (id: string, task: Task) => void;
}

const CardContainer: FC<CardContainerProps> = ({
  tasks,
  status,
  newTask,
  editTask,
}) => {
  return (
    <Container className="px-4 py-2">
      <ContainerTitle text={status} />

      <>
        {tasks.map((task) => (
          <Card task={task} editTask={editTask} key={task.id} />
        ))}
      </>

      <AddCard newTask={newTask} status={status} />
    </Container>
  );
};

export default CardContainer;
