import { ENDPOINTS_URL, QUERY_KEYS } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { ErrorResponse } from "api/types/ErrorResponse";
import { TasksList } from "shared/types/TasksList";
import { UpdateTaskDTO } from "api/types/UpdateTaskDTO";
import { Task } from "shared/types/Task";

const updateTask = async (dto: UpdateTaskDTO) => {
  return await axiosInstance.patch<UpdateTaskDTO, void>(ENDPOINTS_URL.updateTask, dto);
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation<void, ErrorResponse, UpdateTaskDTO>(updateTask, {
    onSuccess: (_, dto) => {
      queryClient.setQueryData<TasksList | undefined>(
        QUERY_KEYS.getListDetails(dto.tasksListId),
        (tl) => {
          if (!tl) return tl;

          if (!tl.tasks) return tl;

          const prevTask = tl.tasks[dto.taskId];

          const newTask: Task = {
            ...prevTask,
            name: dto.shouldUpdate.name ? dto.name! : prevTask.name,
            done: dto.shouldUpdate.done ? dto.done! : prevTask.done,
            description: dto.shouldUpdate.description ? dto.description! : prevTask.description,
            date: dto.shouldUpdate.date ? dto.date! : prevTask.date,
            asap: dto.shouldUpdate.asap ? dto.asap! : prevTask.asap
          };

          const newTasks = {
            ...tl.tasks,
            [dto.taskId]: newTask
          };

          return {
            ...tl,
            tasks: newTasks
          };
        }
      );
    }
  });

  return {
    updateTask: mutate,
    isUpdating: isLoading,
    errorMessage: error?.response.data
  };
};
