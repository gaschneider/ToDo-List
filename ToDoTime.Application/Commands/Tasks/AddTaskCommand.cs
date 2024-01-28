using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoTime.Domain.Exceptions;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Commands.TasksLists
{
    public class AddTaskCommand : IRequest<int>
    {
        public int TasksListId { get; set; }
        public string Name { get; set; }
    }

    public class AddTaskCommandValidator : AbstractValidator<AddTaskCommand>
    {
        public AddTaskCommandValidator()
        {
            RuleFor(_ => _.Name).NotEmpty().WithMessage("Field name must not be null");
            RuleFor(_ => _.Name).MinimumLength(5).WithMessage("Field name should have at least 5 characters");
        }

        public class AddTaskCommandHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<AddTaskCommand, int>
        {
            private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

            public async Task<int> Handle(AddTaskCommand request, CancellationToken cancellationToken)
            {
                var tasksList = await _dbRepo.TasksLists.SingleOrDefaultAsync(tl => tl.Id == request.TasksListId, cancellationToken);
                if (tasksList == null)
                {
                    throw new NotFoundException($"Task list with Id {request.TasksListId} not found");
                }

                var newTask = new Domain.Entities.Task()
                {
                    Name = request.Name,
                    TasksListId = tasksList.Id,
                };

                _dbRepo.Tasks.Add(newTask);

                await _dbRepo.SaveChangeAsync(cancellationToken);

                return newTask.Id;
            }
        }
    }
}