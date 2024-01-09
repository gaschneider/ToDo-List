export const ENDPOINTS_URL = {
  getAllLists: "https://localhost:44368/TasksLists/GetAll",
  getListDetails: (listId: number) =>
    `https://localhost:44368/TasksLists/GetTasksList?tasksListId=${listId}`
};
