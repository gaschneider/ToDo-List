using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Exceptions;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Commands.TasksLists
{
    public class DeleteTaskCommand : IRequest<Unit>
    {
        public int TasksListId { get; set; }
        public int TaskId { get; set; }
    }


    public class DeleteTaskCommandHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<DeleteTaskCommand, Unit>
    {
        private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

        public async Task<Unit> Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
        {
            var task = await _dbRepo.Tasks.SingleOrDefaultAsync(tl => tl.Id == request.TaskId, cancellationToken);
            if (task == null)
            {
                throw new NotFoundException($"Task with Id {request.TaskId} not found");
            }

            if (task.TasksListId != request.TasksListId)
            {
                throw new NotFoundException($"Task with Id {request.TaskId} doesn't belong to Task List being edited");
            }

            _dbRepo.Tasks.Remove(task);

            await _dbRepo.SaveChangeAsync(cancellationToken);

            return Unit.Value;
        }
    }
}