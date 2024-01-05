import { tasksListsMockData } from "mockData/TasksListData";
import { useCallback } from "react";
import { TasksList } from "shared/types/TasksList";

export const useGetTasksListDetails = () => {
  return useCallback((listId: number) => {
    // using this to simulate async call to backend
    return new Promise<TasksList | undefined>((resolve) =>
      setTimeout(() => resolve(tasksListsMockData.find((tl) => tl.id === listId)), 0)
    );
  }, []);
};
