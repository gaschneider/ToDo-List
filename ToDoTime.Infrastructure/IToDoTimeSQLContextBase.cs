using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Entities;

namespace ToDoTime.Infrastructure
{
    public interface IToDoTimeSQLContextBase
    {
        public DbSet<TasksList> TasksLists { get; set; }
        public DbSet<Domain.Entities.Task> Tasks { get; set; }
    }
}
