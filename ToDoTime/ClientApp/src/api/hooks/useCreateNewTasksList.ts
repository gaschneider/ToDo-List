import { ENDPOINTS_URL, QUERY_KEYS } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { CreateTasksListDTO } from "api/types/CreateTasksListDTO";
import { useNavigate } from "react-router-dom";
import { routes, tasksListDetailsRoute } from "routes";
import { useMutation, useQueryClient } from "react-query";
import { ErrorResponse } from "api/types/ErrorResponse";

const createNewList = async (dto: CreateTasksListDTO) => {
  const response = await axiosInstance.post<CreateTasksListDTO, { data: number }>(
    ENDPOINTS_URL.createNewList,
    dto
  );
  return response.data as number;
};

export const useCreateNewTasksList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createNewTasksList,
    isLoading,
    error
  } = useMutation<number, ErrorResponse, CreateTasksListDTO>(createNewList, {
    onSuccess: (newTaskListId) => {
      const newTaskListRoute = routes[tasksListDetailsRoute].replace(
        ":listId",
        newTaskListId.toString()
      );
      navigate(newTaskListRoute);
    },
    onSettled: () => {
      queryClient.invalidateQueries(QUERY_KEYS.getAllLists);
    }
  });

  return {
    createNewTasksList,
    isLoading,
    errorMessage: error?.response.data
  };
};
