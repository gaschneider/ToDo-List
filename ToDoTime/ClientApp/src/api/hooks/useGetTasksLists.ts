import { useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";
import axios from "axios";
import { BASE_URL, ENDPOINTS_URL } from "api/endpoints";

export const useGetTasksLists = () => {
  const [tasksLists, setTasksLists] = useState<TasksList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    axios
      .get(`${BASE_URL}${ENDPOINTS_URL.getAllLists}`)
      .then((res) => {
        setTasksLists(res.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    tasksLists,
    isLoading,
    errorMessage
  };
};
