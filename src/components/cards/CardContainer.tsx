import { FC } from "react";
import { Task, TaskStatus } from "../../types/task";
import Container from "../layout/Container";
import ContainerTitle from "../layout/ContainerTitle";
import Card from "./Card";

interface CardContainerProps {
  tasks: Task[];
  status: TaskStatus;
}

const CardContainer: FC<CardContainerProps> = ({ tasks, status }) => {
  return (
    <Container className="px-4 py-2">
      <ContainerTitle text={status} />

      <>
        {tasks.map((task) => (
          <Card task={task} key={task.id} />
        ))}
      </>
    </Container>
  );
};

export default CardContainer;
