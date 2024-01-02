import styled from "@emotion/styled";
import { Checkbox } from "shared/components/Checkbox";
import { Task } from "shared/types/Task";

type ListOfTasksProps = {
  tasks: Record<number, Task>;
  toggleTaskDone: (id: number) => void;
};

export const ListOfTasks: React.FC<ListOfTasksProps> = ({ tasks, toggleTaskDone }) => {
  return (
    <TasksWrapper>
      {Object.values(tasks).map((t) => (
        <div key={t.id}>
          <Checkbox
            id={t.id.toString()}
            label={t.name}
            checked={t.done}
            onToggle={() => toggleTaskDone(t.id)}
          />
        </div>
      ))}
    </TasksWrapper>
  );
};

const TasksWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
  overflow: hidden;
  padding: 5px;
`;
