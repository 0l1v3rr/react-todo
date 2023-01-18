import { Label } from "../types/task";
import { FC } from "react";
import Container from "../components/layout/Container";
import ContainerTitle from "../components/layout/ContainerTitle";
import Flex from "../components/layout/Flex";
import LabelItem from "../components/cards/LabelItem";

interface LabelsProps {
  labels: Label[];
}

const Labels: FC<LabelsProps> = (props) => {
  return (
    <Container className="px-4 py-2">
      <ContainerTitle text="Labels"></ContainerTitle>

      <Flex className="justify-start flex-wrap">
        {props.labels.map((label) => (
          <LabelItem label={label} key={label.id} />
        ))}
      </Flex>
    </Container>
  );
};

export default Labels;
