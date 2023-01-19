import { FC } from "react";
import { Task, TaskStatus } from "../../types/task";
import Container from "../layout/Container";
import ContainerTitle from "../layout/ContainerTitle";
import Card from "./Card";

interface CardContainerProps {
  tasks: Task[];
  status: TaskStatus;
  editTask: (id: string, task: Task) => void;
}

const CardContainer: FC<CardContainerProps> = ({ tasks, status, editTask }) => {
  return (
    <Container className="px-4 py-2">
      <ContainerTitle text={status} />

      <>
        {tasks.map((task) => (
          <Card task={task} editTask={editTask} key={task.id} />
        ))}
      </>
    </Container>
  );
};

export default CardContainer;
