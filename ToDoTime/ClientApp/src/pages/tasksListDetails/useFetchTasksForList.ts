import { useGetTasksListDetails } from "api/hooks/useGetTasksListDetails";
import { useEffect, useState } from "react";
import { TasksList } from "shared/types/TasksList";

export const useFetchTasksForList = (listId: number) => {
  const getTasksListDetails = useGetTasksListDetails();
  const [listDetails, setListDetails] = useState<TasksList>();

  useEffect(() => {
    // this triggers the spinner in the screen
    setListDetails(undefined);
    getTasksListDetails(listId).then((details) => {
      setListDetails(details);
    });
  }, [getTasksListDetails, listId]);

  return listDetails;
};
