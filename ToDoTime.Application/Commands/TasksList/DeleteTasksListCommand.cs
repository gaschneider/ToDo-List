using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Exceptions;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Commands.TasksLists
{
    public class DeleteTasksListCommand : IRequest<Unit>
    {
        public int TasksListId { get; set; }
    }


    public class DeleteTasksListCommandHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<DeleteTasksListCommand, Unit>
    {
        private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

        public async Task<Unit> Handle(DeleteTasksListCommand request, CancellationToken cancellationToken)
        {
            var tasksList = await _dbRepo.TasksLists.SingleOrDefaultAsync(tl => tl.Id == request.TasksListId, cancellationToken);
            if (tasksList == null)
            {
                throw new NotFoundException($"Task list with Id {request.TasksListId} not found");
            }

            _dbRepo.TasksLists.Remove(tasksList);

            await _dbRepo.SaveChangeAsync(cancellationToken);

            return Unit.Value;
        }
    }
}