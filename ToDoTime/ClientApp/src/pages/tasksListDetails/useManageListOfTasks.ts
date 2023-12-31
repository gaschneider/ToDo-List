import { useCallback, useState } from "react";
import { Task } from "shared/types/Task";

type UseManageListOfTasksSignature = (
  initialListOfTasks: Record<number, Task>,
  onToggleTask?: (id: number, isDone: boolean) => void
) => {
  listOfTasks: Record<number, Task>;
  toggleTaskDone: (id: number) => void;
};

export const useManageListOfTasks: UseManageListOfTasksSignature = (
  initialListOfTasks,
  onToggleTask
) => {
  const [listOfTasks, setListOfTasks] = useState(initialListOfTasks);

  const toggleTaskDone = useCallback(
    (id: number) => {
      const taskToUpdate = listOfTasks[id];
      if (!taskToUpdate) return;

      const updatedTask: Task = { ...taskToUpdate, done: !taskToUpdate.done };
      onToggleTask?.(id, updatedTask.done);

      setListOfTasks((prev) => ({ ...prev, [id]: updatedTask }));
    },
    [listOfTasks, onToggleTask]
  );

  return {
    listOfTasks,
    toggleTaskDone
  };
};
