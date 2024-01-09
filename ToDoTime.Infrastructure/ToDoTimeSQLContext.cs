using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Entities;

namespace ToDoTime.Infrastructure
{
    public class ToDoTimeSQLContext(DbContextOptions<ToDoTimeSQLContext> options) : DbContext(options), IToDoTimeSQLContext
    {
        public DbSet<TasksList> TasksLists { get; set; }
        public DbSet<Domain.Entities.Task> Tasks { get; set; }
    }
}
