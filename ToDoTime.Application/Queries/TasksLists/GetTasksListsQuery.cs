using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Queries.TasksLists
{
    public class GetAllTasksListsQuery : IRequest<List<TasksListsVM>> { }

    public class GetAllTasksListsQueryHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<GetAllTasksListsQuery, List<TasksListsVM>>
    {
        private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

        public async Task<List<TasksListsVM>> Handle(GetAllTasksListsQuery request, CancellationToken cancellationToken)
        {

            var allTasksLists = await _dbRepo.TasksLists.Include(tl => tl.Tasks).Select(tl => new TasksListsVM(tl)).ToListAsync(cancellationToken: cancellationToken);

            return allTasksLists;
        }
    }
}
