using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.DTOs;
using ToDoTime.Domain.Exceptions;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Queries.TasksLists
{
    public class GetTasksListQuery : IRequest<TasksListVM>
    {
        public int TasksListId { get; set; }
    }

    public class GetTasksListsQueryHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<GetTasksListQuery, TasksListVM>
    {
        private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

        public async Task<TasksListVM> Handle(GetTasksListQuery request, CancellationToken cancellationToken)
        {
            var tasksList = await _dbRepo.TasksLists.Include(tl => tl.Tasks).SingleOrDefaultAsync(tl => tl.Id == request.TasksListId, cancellationToken);
            if (tasksList == null)
            {
                throw new NotFoundException($"Task list with Id {request.TasksListId} not found");
            }

            return new TasksListVM(tasksList);
        }
    }
}
