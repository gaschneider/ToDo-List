import { ENDPOINTS_URL } from "api/endpoints";
import { axiosInstance } from "api/axiosInstance";
import { useQuery } from "react-query";
import { TasksList } from "shared/types/TasksList";
import { ErrorResponse } from "api/types/ErrorResponse";

const retrieveLists = async () => {
  const response = await axiosInstance.get(ENDPOINTS_URL.getAllLists);
  return response.data;
};

export const useGetTasksLists = () => {
  const {
    data: tasksLists,
    error,
    isLoading
  } = useQuery<TasksList[], ErrorResponse>("tasksListData", retrieveLists);

  return {
    tasksLists,
    isLoading,
    errorMessage: error?.response.data
  };
};
