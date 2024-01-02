import { Checkbox } from "shared/components/Checkbox";
import { Task } from "shared/types/Task";

type ListOfTasksProps = {
  tasks: Record<number, Task>;
  toggleTaskDone: (id: number) => void;
};

export const ListOfTasks: React.FC<ListOfTasksProps> = ({ tasks, toggleTaskDone }) => {
  return (
    <>
      {Object.values(tasks).map((t) => (
        <div key={t.id}>
          <Checkbox
            id={t.id.toString()}
            label={t.name}
            checked={t.done}
            onToggle={() => toggleTaskDone(t.id)}
          />
        </div>
      ))}
    </>
  );
};
