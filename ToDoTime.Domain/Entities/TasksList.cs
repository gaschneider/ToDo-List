namespace ToDoTime.Domain.Entities
{
    public class TasksList
    {
        public int Id { get; set; }
        public string Name { get; set; } = "My list";
        public string Description { get; set; } = "";
        public string Icon { get; set; }
        public virtual ICollection<Task> Tasks { get; } = new List<Task>();
    }
}
