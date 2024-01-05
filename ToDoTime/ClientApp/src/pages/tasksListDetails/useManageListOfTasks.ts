import { useCallback, useEffect, useState } from "react";
import { Task } from "shared/types/Task";

type UseManageListOfTasksSignature = (
  tasks?: Record<number, Task>,
  onToggleTask?: (id: number, isDone: boolean) => void
) => {
  listOfTasks: Record<number, Task>;
  toggleTaskDone: (id: number) => void;
  onCreateTask: (newName: string) => void;
};

export const useManageListOfTasks: UseManageListOfTasksSignature = (tasks = {}, onToggleTask) => {
  const [listOfTasks, setListOfTasks] = useState(tasks);

  useEffect(() => {
    setListOfTasks(tasks);
  }, [tasks]);

  const toggleTaskDone = useCallback(
    (id: number) => {
      if (!listOfTasks) return;

      const taskToUpdate = listOfTasks[id];
      if (!taskToUpdate) return;

      const updatedTask: Task = { ...taskToUpdate, done: !taskToUpdate.done };
      onToggleTask?.(id, updatedTask.done);

      setListOfTasks((prev) => ({ ...prev, [id]: updatedTask }));
    },
    [listOfTasks, onToggleTask]
  );

  const onCreateTask = useCallback((newName: string) => {
    setListOfTasks((prev) => {
      const sortedIds = Object.keys(prev).sort((a, b) => Number(a) - Number(b));
      const newId = Number(sortedIds[sortedIds.length - 1]) + 1;

      const newListOfTasks = { ...prev };
      newListOfTasks[newId] = {
        id: newId,
        name: newName,
        done: false
      };
      return newListOfTasks;
    });
  }, []);

  return {
    listOfTasks,
    toggleTaskDone,
    onCreateTask
  };
};
