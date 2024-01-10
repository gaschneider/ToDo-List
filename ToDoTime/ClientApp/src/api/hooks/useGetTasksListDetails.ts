import { BASE_URL, ENDPOINTS_URL } from "api/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";

export const useGetTasksListDetails = (listId: number) => {
  const [tasksList, setTasksList] = useState<TasksList>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (listId <= 0) return;

    axios
      .get(`${BASE_URL}${ENDPOINTS_URL.getListDetails(listId)}`)
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
