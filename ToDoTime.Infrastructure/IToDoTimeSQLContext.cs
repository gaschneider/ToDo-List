namespace ToDoTime.Infrastructure
{
    public interface IToDoTimeSQLContext : IToDoTimeSQLContextBase
    {
        Task<int> SaveChangeAsync(CancellationToken cancellationToken);
    }
}
