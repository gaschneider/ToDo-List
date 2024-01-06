using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.DTOs;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Queries.TasksLists
{
    public class GetAllTasksListsQuery : IRequest<List<TasksListVM>> { }

    public class GetAllTasksListsQueryHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<GetAllTasksListsQuery, List<TasksListVM>>
    {
        private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

        public async Task<List<TasksListVM>> Handle(GetAllTasksListsQuery request, CancellationToken cancellationToken)
        {

            var allTasksLists = await _dbRepo.TasksLists.Select(tl => new TasksListVM(tl)).ToListAsync(cancellationToken: cancellationToken);

            return allTasksLists;
        }
    }
}
