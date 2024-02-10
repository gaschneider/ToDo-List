import { ENDPOINTS_URL, QUERY_KEYS } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { ErrorResponse } from "api/types/ErrorResponse";
import { TasksList } from "shared/types/TasksList";

type DeleteTaskArgs = {
  listId: number;
  taskId: number;
};

const deleteTask = async ({ listId, taskId }: DeleteTaskArgs) => {
  return await axiosInstance.delete<number, void>(ENDPOINTS_URL.deleteTask(listId, taskId));
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation<void, ErrorResponse, DeleteTaskArgs>(
    deleteTask,
    {
      onSuccess: (_, args) => {
        queryClient.setQueryData<TasksList | undefined>(
          QUERY_KEYS.getListDetails(args.listId),
          (tl) => {
            if (!tl) return tl;

            if (!tl.tasks) return tl;

            const newTasks = {
              ...tl.tasks
            };

            delete newTasks[args.taskId];

            return {
              ...tl,
              tasks: newTasks
            };
          }
        );
      }
    }
  );

  return {
    deleteTask: mutate,
    isDeleting: isLoading,
    errorMessage: error?.response.data
  };
};
