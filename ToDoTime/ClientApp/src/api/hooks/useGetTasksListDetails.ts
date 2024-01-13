import { axiosInstance } from "api/axiosInstance";
import { ENDPOINTS_URL } from "api/endpoints";
import { ErrorResponse } from "api/types/ErrorResponse";
import { useQuery } from "react-query";
import { TasksList } from "shared/types/TasksList";

const retrieveListDetail = async (listId: number) => {
  const response = await axiosInstance.get(ENDPOINTS_URL.getListDetails(listId));
  return response.data;
};

export const useGetTasksListDetails = (listId: number) => {
  const {
    data: tasksList,
    error,
    isLoading
  } = useQuery<TasksList, ErrorResponse>(`tasksListDetailData-${listId}`, () =>
    retrieveListDetail(listId)
  );

  return {
    tasksList,
    isLoading,
    errorMessage: error?.response.data
  };
};
