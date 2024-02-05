export type UpdateTaskDTO = {
  tasksListId: number;
  taskId: number;
  name?: string;
  done?: boolean;
  description?: string;
  asap?: boolean;
  date?: string;
  shouldUpdate: {
    name?: boolean;
    done?: boolean;
    description?: boolean;
    asap?: boolean;
    date?: boolean;
  };
};
