namespace ToDoTime.Domain.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public bool? Asap { get; set; }
        public bool Done { get; set; } = false;
        public int TasksListId { get; set; }
        public virtual TasksList TasksList { get; set; }

    }
}
