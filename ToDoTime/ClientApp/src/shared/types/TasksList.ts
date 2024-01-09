import { AvailableIconsEnum } from "shared/availableIcons";
import { Task } from "./Task";

export type TasksList = {
  id: number;
  name: string;
  description: string;
  icon: AvailableIconsEnum;
  tasks?: Record<number, Task>;
};
