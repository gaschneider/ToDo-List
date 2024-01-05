import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { validateListName } from "shared/helpers/validations";
import { TasksList } from "shared/types/TasksList";

type UseManageTasksListHook = (tasksList?: TasksList) => {
  taskListDescription?: string;
  taskListName?: string;
  setDescription: Dispatch<SetStateAction<string | undefined>>;
  onSetName: (name: string) => boolean;
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

  const onSetName = useCallback((name: string) => {
    const { isValid } = validateListName(name);
    if (isValid) {
      setName(name);
    }

    return isValid;
  }, []);

  return {
    taskListDescription: description,
    taskListName: name,
    onSetName,
    setDescription
  };
};
