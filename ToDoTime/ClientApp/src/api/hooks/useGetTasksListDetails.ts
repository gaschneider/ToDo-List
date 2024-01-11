import { axiosInstance } from "api/axiosInstance";
import { ENDPOINTS_URL } from "api/endpoints";
import { useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";

export const useGetTasksListDetails = (listId: number) => {
  const [tasksList, setTasksList] = useState<TasksList>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (listId <= 0) return;

    axiosInstance
      .get(ENDPOINTS_URL.getListDetails(listId))
      .then((res) => {
        setTasksList(res.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listId]);

  return {
    tasksList,
    isLoading,
    errorMessage
  };
};
