using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Entities;

namespace ToDoTime.Infrastructure
{
    public interface IToDoTimeSQLContext
    {
        public DbSet<TasksList> TasksLists { get; set; }
    }
}
