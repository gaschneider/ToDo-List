import { useUpdateTasksList } from "api/hooks/useUpdateTasksList";
import { UpdateTasksListDTO } from "api/types/UpdateTasksListDTO";
import { useCallback } from "react";
import { validateListName } from "shared/helpers/validations";
import { TasksList } from "shared/types/TasksList";

export const useManageTasksList = (tasksList: TasksList) => {
  const {
    updateTasksList,
    isLoading: isPatching,
    errorMessage: patchErrorMessage
  } = useUpdateTasksList(tasksList.id);

  const onChangeName = useCallback(
    (name: string) => {
      const { isValid } = validateListName(name);
      if (isValid) {
        const dto: UpdateTasksListDTO = {
          id: tasksList.id,
          name,
          shouldUpdate: {
            name: true
          }
        };
        updateTasksList(dto);
      }

      return isValid;
    },
    [tasksList.id, updateTasksList]
  );

  const onChangeDescription = useCallback(
    (description?: string) => {
      const dto: UpdateTasksListDTO = {
        id: tasksList.id,
        description,
        shouldUpdate: {
          description: true
        }
      };
      updateTasksList(dto);
    },
    [tasksList.id, updateTasksList]
  );

  return {
    isPatching,
    patchErrorMessage,
    onChangeName,
    onChangeDescription
  };
};
