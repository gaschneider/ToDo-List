import { useManageListOfTasks } from "pages/tasksListDetails/useManageListOfTasks";
import { Checkbox } from "shared/components/Checkbox";
import { Task } from "shared/types/Task";

type ListOfTasksProps = {
  tasks: Record<number, Task>;
};

export const ListOfTasks: React.FC<ListOfTasksProps> = ({ tasks }) => {
  const { listOfTasks, toggleTaskDone } = useManageListOfTasks(tasks);

  return (
    <>
      {Object.values(listOfTasks).map((t) => (
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
