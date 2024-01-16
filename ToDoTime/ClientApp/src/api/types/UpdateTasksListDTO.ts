export type UpdateTasksListDTO = {
  id: number;
  name?: string;
  icon?: string;
  description?: string;
  shouldUpdate: {
    name?: boolean;
    icon?: boolean;
    description?: boolean;
  };
};
