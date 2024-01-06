import axios from "axios";
import { useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";

export const useGetTasksListDetails = (listId: number) => {
  const [tasksList, setTasksList] = useState<TasksList>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:44368/TasksLists/Get?tasksListId=${listId}`)
      .then((res) => {
        setTasksList(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listId]);

  return {
    tasksList,
    isLoading,
    error
  };
};
