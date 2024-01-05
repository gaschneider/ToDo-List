import { LoaderFunctionArgs } from "react-router-dom";

interface TasksListDetailsParams {
  listId: string;
}

export const tasksListDetailsLoader = async ({
  params
}: LoaderFunctionArgs<TasksListDetailsParams>) => {
  return Number.isFinite(Number(params.listId)) ? Number(params.listId) : 0;
};
