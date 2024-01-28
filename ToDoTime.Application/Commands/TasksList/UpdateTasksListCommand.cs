using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Exceptions;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Commands.TasksLists
{
    public class UpdateTasksListCommand : IRequest<Unit>
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Description { get; set; }
        public UpdateTasksListFieldsToUpdateDTO ShouldUpdate { get; set; } = new UpdateTasksListFieldsToUpdateDTO();
    }

    public class UpdateTasksListFieldsToUpdateDTO
    {
        public bool Name { get; set; } = false;
        public bool Icon { get; set; } = false;
        public bool Description { get; set; } = false;
    }

    public class UpdateTasksListCommandValidator : AbstractValidator<UpdateTasksListCommand>
    {
        public UpdateTasksListCommandValidator()
        {
            RuleFor(_ => _.Name).NotEmpty().WithMessage("Field name must not be null").When(_ => _.ShouldUpdate.Name);
            RuleFor(_ => _.Name).MinimumLength(5).WithMessage("Field name should have at least 5 characters").When(_ => _.ShouldUpdate.Name);
            RuleFor(_ => _.Name).MaximumLength(20).WithMessage("Field name should have up to 20 characters.").When(_ => _.ShouldUpdate.Name);
            RuleFor(_ => _.Icon).NotEmpty().WithMessage("Icon must be selected").When(_ => _.ShouldUpdate.Icon);
        }

        public class UpdateTasksListCommandHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<UpdateTasksListCommand, Unit>
        {
            private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

            public async Task<Unit> Handle(UpdateTasksListCommand request, CancellationToken cancellationToken)
            {
                var tasksList = await _dbRepo.TasksLists.SingleOrDefaultAsync(tl => tl.Id == request.Id, cancellationToken);
                if (tasksList == null)
                {
                    throw new NotFoundException($"Task list with Id {request.Id} not found");
                }

                if (request.ShouldUpdate.Name)
                {
                    tasksList.Name = request.Name;
                }

                if (request.ShouldUpdate.Description)
                {
                    tasksList.Description = request.Description;
                }

                if (request.ShouldUpdate.Icon)
                {
                    tasksList.Icon = request.Icon;
                }

                _dbRepo.TasksLists.Update(tasksList);

                await _dbRepo.SaveChangeAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}