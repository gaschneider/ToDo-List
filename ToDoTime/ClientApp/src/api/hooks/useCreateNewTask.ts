import { ENDPOINTS_URL, QUERY_KEYS } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { ErrorResponse } from "api/types/ErrorResponse";
import { CreateTaskDTO } from "api/types/CreateTaskDTO";

const createNewTaskAction = async (dto: CreateTaskDTO) => {
  const response = await axiosInstance.post<CreateTaskDTO, { data: number }>(
    ENDPOINTS_URL.createNewTask,
    dto
  );
  return response.data as number;
};

export const useCreateNewTask = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createNewTask,
    isLoading,
    error
  } = useMutation<number, ErrorResponse, CreateTaskDTO>(createNewTaskAction, {
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(QUERY_KEYS.getListDetails(variables.tasksListId));
    }
  });

  return {
    createNewTask,
    isLoading,
    errorMessage: error?.response.data
  };
};
