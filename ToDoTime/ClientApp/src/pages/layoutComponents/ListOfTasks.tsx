import styled from "@emotion/styled";
import { Task } from "shared/types/Task";
import { TaskComponent } from "./TaskComponent";

type ListOfTasksProps = {
  tasks: Record<number, Task>;
  toggleTaskDone: (id: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export const ListOfTasks: React.FC<ListOfTasksProps> = ({
  tasks,
  toggleTaskDone,
  onDeleteTask
}) => {
  return (
    <TasksWrapper>
      {Object.values(tasks).map((t) => (
        <TaskComponent
          key={t.id}
          task={t}
          onDeleteTask={onDeleteTask}
          toggleTaskDone={toggleTaskDone}
        />
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
