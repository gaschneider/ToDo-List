import { useCreateNewTask } from "api/hooks/Task/useCreateNewTask";
import { useDeleteTask } from "api/hooks/Task/useDeleteTask";
import { useUpdateTask } from "api/hooks/Task/useUpdateTask";
import { useCallback, useEffect, useState } from "react";
import { Task } from "shared/types/Task";
import { TasksList } from "shared/types/TasksList";

type UseManageListOfTasksSignature = (tasksList: TasksList) => {
  listOfTasks: Record<number, Task>;
  toggleTaskDone: (id: number) => void;
  onCreateTask: (newName: string) => void;
  onDeleteTask: (taskId: number) => void;
};

export const useManageListOfTasks: UseManageListOfTasksSignature = (tasksList) => {
  const [listOfTasks, setListOfTasks] = useState(tasksList.tasks ?? {});
  const { createNewTask } = useCreateNewTask();
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();

  useEffect(() => {
    setListOfTasks(tasksList.tasks ?? {});
  }, [tasksList.tasks]);

  const toggleTaskDone = useCallback(
    (id: number) => {
      if (!listOfTasks) return;

      const taskToUpdate = listOfTasks[id];
      if (!taskToUpdate) return;

      updateTask({
        tasksListId: tasksList.id,
        taskId: id,
        done: !taskToUpdate.done,
        shouldUpdate: {
          done: true
        }
      });
    },
    [listOfTasks, tasksList.id, updateTask]
  );

  const onCreateTask = useCallback(
    (newName: string) => {
      createNewTask({
        tasksListId: tasksList.id,
        name: newName
      });
    },
    [createNewTask, tasksList.id]
  );

  const onDeleteTask = useCallback(
    (taskId: number) => {
      deleteTask({
        listId: tasksList.id,
        taskId
      });
    },
    [deleteTask, tasksList.id]
  );

  return {
    listOfTasks,
    toggleTaskDone,
    onCreateTask,
    onDeleteTask
  };
};
