using ToDoTime.Domain.Entities;

namespace ToDoTime.Domain.DTOs
{
    public class TasksListVM
    {
        public int Id { get; set; }
        public string Name { get; set; } = "My list";
        public string Description { get; set; } = "";
        public string Icon { get; set; }
        public Dictionary<int, TaskVM> Tasks { get; } = new Dictionary<int, TaskVM>();
        public TasksListVM(TasksList tasksList)
        {
            Id = tasksList.Id;
            Name = tasksList.Name;
            Description = tasksList.Description;
            Icon = tasksList.Icon;
            foreach (var task in tasksList.Tasks)
            {
                Tasks.Add(task.Id, new TaskVM(task));
            }

        }
    }
}
