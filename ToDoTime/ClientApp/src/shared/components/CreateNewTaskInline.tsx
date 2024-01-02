import { Button } from "./Button";

type CreateNewTaskInlineProps = {
  onCreate: (name: string) => void;
};

export const CreateNewTaskInline: React.FC<CreateNewTaskInlineProps> = ({ onCreate }) => {
  return <Button onClick={() => onCreate("newTask")}>Create</Button>;
};
