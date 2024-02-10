import styled from "@emotion/styled";
import { FC } from "react";
import { BoxCustomIcon } from "shared/BoxCustomIcon";
import { Checkbox } from "shared/components/Checkbox";
import { APP_GOLD_COLOR } from "shared/constants/appStyles";
import { Task } from "shared/types/Task";

type TaskProps = {
  task: Task;
  toggleTaskDone: (id: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export const TaskComponent: FC<TaskProps> = ({ task, toggleTaskDone, onDeleteTask }) => {
  return (
    <TaskWrapper>
      <Checkbox
        id={task.id.toString()}
        label={task.name}
        checked={task.done}
        onToggle={() => toggleTaskDone(task.id)}
      />
      <BoxCustomIcon
        nameIcon="BiTrash"
        propsIcon={{
          size: 26,
          color: APP_GOLD_COLOR,
          onClick: () => onDeleteTask(task.id),
          style: { cursor: "pointer" }
        }}
      />
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
