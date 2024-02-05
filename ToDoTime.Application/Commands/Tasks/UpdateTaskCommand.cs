using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Exceptions;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Commands.TasksLists
{
    public class UpdateTaskCommand : IRequest<Unit>
    {
        public int TasksListId { get; set; }
        public int TaskId { get; set; }
        public string? Name { get; set; }
        public bool? Done { get; set; }
        public bool? Asap { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public UpdateTaskFieldsToUpdateDTO ShouldUpdate { get; set; } = new UpdateTaskFieldsToUpdateDTO();
    }

    public class UpdateTaskFieldsToUpdateDTO
    {
        public bool Name { get; set; } = false;
        public bool Done { get; set; } = false;
        public bool Asap { get; set; } = false;
        public bool Description { get; set; } = false;
        public bool Date { get; set; } = false;
    }

    public class UpdateTaskCommandValidator : AbstractValidator<UpdateTaskCommand>
    {
        public UpdateTaskCommandValidator()
        {
            RuleFor(_ => _.Name).NotEmpty().WithMessage("Field name must not be null").When(_ => _.ShouldUpdate.Name);
            RuleFor(_ => _.Name).MinimumLength(5).WithMessage("Field name should have at least 5 characters").When(_ => _.ShouldUpdate.Name);
        }

        public class UpdateTaskCommandHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<UpdateTaskCommand, Unit>
        {
            private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

            public async Task<Unit> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
            {
                var task = await _dbRepo.Tasks.SingleOrDefaultAsync(tl => tl.Id == request.TaskId, cancellationToken);
                if (task == null)
                {
                    throw new NotFoundException($"Task with Id {request.TaskId} not found");
                }

                if (task.TasksListId != request.TasksListId)
                {
                    throw new NotFoundException($"Task being updated doesn't belong to list being updated");
                }


                if (request.ShouldUpdate.Name)
                {
                    task.Name = request.Name;
                }

                if (request.ShouldUpdate.Done)
                {
                    task.Done = request.Done.Value;
                }

                if (request.ShouldUpdate.Description)
                {
                    task.Description = request.Description;
                }

                if (request.ShouldUpdate.Asap)
                {
                    task.Asap = request.Asap;
                }

                if (request.ShouldUpdate.Date)
                {
                    task.Date = request.Date;
                }

                _dbRepo.Tasks.Update(task);

                await _dbRepo.SaveChangeAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}