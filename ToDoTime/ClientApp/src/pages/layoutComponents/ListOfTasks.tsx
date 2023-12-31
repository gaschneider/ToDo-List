import { Task } from "shared/types/Task";

type ListOfTasksProps = {
  tasks: Task[];
};

export const ListOfTasks: React.FC<ListOfTasksProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((t) => (
        <div key={t.id}>{t.name}</div>
      ))}
    </>
  );
};
