namespace ToDoTime.Application.Queries.TasksLists
{
    public class TaskVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
        public bool Asap { get; set; }
        public bool Done { get; set; }
        public int TasksListId { get; set; }

        public TaskVM(Domain.Entities.Task task)
        {
            Id = task.Id;
            Name = task.Name;
            Description = task.Description;
            Date = task.Date;
            Asap = task.Asap;
            Done = task.Done;
            TasksListId = task.TasksListId;
        }
    }
}
