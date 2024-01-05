export type Task = {
  id: number;
  name: string;
  description?: string;
  date?: string;
  asap?: boolean;
  done: boolean;
};
