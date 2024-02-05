export const BASE_URL = "https://localhost:44368";

export const ENDPOINTS_URL = {
  getAllLists: "/TasksLists/GetAll",
  getListDetails: (listId: number) => `/TasksLists/GetTasksList?tasksListId=${listId}`,
  createNewList: "/TasksLists/CreateTasksList",
  updateListDetails: "/TasksLists/UpdateTasksList",
  deleteList: (listId: number) => `/TasksLists/DeleteTasksList?tasksListId=${listId}`,
  createNewTask: "/Tasks/CreateTask",
  updateTask: "/Tasks/UpdateTask"
};

export const QUERY_KEYS = {
  getAllLists: "tasksListData",
  getListDetails: (listId: number) => `tasksListDetailData-${listId}`
};
