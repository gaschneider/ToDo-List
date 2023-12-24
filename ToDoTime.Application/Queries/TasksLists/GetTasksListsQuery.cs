using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Entities;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Queries.TasksLists
{
    public class GetAllTasksListsQuery : IRequest<List<TasksList>> { }

    public class GetAllTasksListsQueryHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<GetAllTasksListsQuery, List<TasksList>>
    {
        private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

        public async Task<List<TasksList>> Handle(GetAllTasksListsQuery request, CancellationToken cancellationToken)
        {
            var allTasksLists = await _dbRepo.TasksLists.ToListAsync(cancellationToken: cancellationToken);

            return allTasksLists;
        }
    }
}
