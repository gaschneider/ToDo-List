using Microsoft.EntityFrameworkCore;
using ToDo_List.Domain.Models;

namespace ToDo_List.Domain
{
    public class ToDoListsContext : DbContext
    {
        public ToDoListsContext(DbContextOptions<ToDoListsContext> options) : base(options)
        { }

        public DbSet<ToDoList> ToDoLists { get; set; }
    }
}
