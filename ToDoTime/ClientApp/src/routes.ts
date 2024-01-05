export const homeRoute = "home";
export const newListRoute = "newList";
export const listsRoute = "lists";
export const taskDetailRoute = "taskDetail";
export const tasksListDetailsRoute = "tasksListDetails";

export const routes = {
  [homeRoute]: "/",
  [newListRoute]: "/new-list",
  [listsRoute]: "/lists",
  [taskDetailRoute]: "/task-detail/:taskId",
  [tasksListDetailsRoute]: "/tasks-list-details/:listId"
};
