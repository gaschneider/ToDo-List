import { useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";
import axios from "axios";

export const useGetTasksLists = () => {
  const [tasksLists, setTasksLists] = useState<TasksList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:44368/TasksLists/GetAll")
      .then((res) => {
        setTasksLists(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    tasksLists,
    isLoading,
    error
  };
};
