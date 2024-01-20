import styled from "@emotion/styled";
import { Button } from "../../shared/components/Button";
import { Input } from "../../shared/components/Input";
import { KeyboardEventHandler, useCallback, useState } from "react";

type CreateNewTaskInlineProps = {
  onCreate: (name: string) => void;
};

export const CreateNewTaskInline: React.FC<CreateNewTaskInlineProps> = ({ onCreate }) => {
  const [newTaskName, setNewTaskName] = useState("My new task");

  const handlesEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === "Enter") {
        onCreate(newTaskName);
      }
    },
    [newTaskName, onCreate]
  );

  return (
    <Wrapper>
      <Field>New task name: </Field>
      <Input
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        onKeyDown={handlesEnter}
      />
      <Button onClick={() => onCreate(newTaskName)}>Create</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 30px);
  grid-template-columns: 1fr;
  grid-gap: 20px;
  place-items: center;
  height: 155px;

  @media (min-width: 600px) {
    grid-template-columns: 150px 1fr 100px;
    grid-template-rows: 1fr;
    place-items: center;
    padding: 8px 0px;
    height: 100%;
  }
`;

const Field = styled.span`
  color: var(--app-gold-color);
  font-weight: bold;
`;
