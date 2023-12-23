namespace ToDo_List.Domain.Models
{
    public class ToDoList
    {
        public int Id { get; set; }
        public string Name { get; set; } = "My list";
        public string Description { get; set; } = "To Do list";
    }
}
