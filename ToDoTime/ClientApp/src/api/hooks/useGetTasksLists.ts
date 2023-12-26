import { tasksListsMockData } from "mockData/TasksListData";
import { useCallback } from "react";
import { TasksList } from "shared/types/List";

export const useGetTasksLists = () => {
  return useCallback(() => {
    // using this to simulate async call to backend
    return new Promise<TasksList[] | undefined>((resolve) =>
      setTimeout(() => resolve(tasksListsMockData), 2000)
    );
  }, []);
};
