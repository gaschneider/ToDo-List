import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";

type UseManageTasksListHook = (tasksList?: TasksList) => {
  taskListDescription?: string;
  taskListName?: string;
  setDescription: Dispatch<SetStateAction<string | undefined>>;
  setName: Dispatch<SetStateAction<string | undefined>>;
};

export const useManageTasksList: UseManageTasksListHook = (tasksList) => {
  const [description, setDescription] = useState(tasksList?.description);
  const [name, setName] = useState(tasksList?.name);

  useEffect(() => {
    if (tasksList?.description) {
      setDescription(tasksList?.description);
    }
  }, [tasksList?.description]);

  useEffect(() => {
    if (tasksList?.name) {
      setName(tasksList?.name);
    }
  }, [tasksList?.name]);

  return {
    taskListDescription: description,
    taskListName: name,
    setName,
    setDescription
  };
};
