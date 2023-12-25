namespace ToDoTime.Domain.Entities
{
    public class TasksList
    {
        public int Id { get; set; }
        public string Name { get; set; } = "My list";
        public string Description { get; set; } = "To Do list";
    }
}
