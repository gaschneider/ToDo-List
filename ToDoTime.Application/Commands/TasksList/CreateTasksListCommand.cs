using FluentValidation;
using MediatR;
using ToDoTime.Domain.Entities;
using ToDoTime.Infrastructure;

namespace ToDoTime.Application.Queries.TasksLists
{
    public class CreateTasksListCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
    }

    public class Validator : AbstractValidator<CreateTasksListCommand>
    {
        public Validator()
        {
            RuleFor(_ => _.Name).NotEmpty().WithMessage("Field name must not be null");
            RuleFor(_ => _.Name).MinimumLength(5).WithMessage("Field name should have at least 5 characters");
            RuleFor(_ => _.Name).MaximumLength(20).WithMessage("Field name should have up to 20 characters.");
            RuleFor(_ => _.Icon).NotEmpty().WithMessage("Icon must be selected");
        }

        public class CreateTasksListCommandHandler(IToDoTimeSQLContext dbRepo) : IRequestHandler<CreateTasksListCommand, int>
        {
            private readonly IToDoTimeSQLContext _dbRepo = dbRepo;

            public async Task<int> Handle(CreateTasksListCommand request, CancellationToken cancellationToken)
            {
                var newList = new TasksList()
                {
                    Name = request.Name,
                    Icon = request.Icon,
                    Description = request.Description,
                };

                _dbRepo.TasksLists.Add(newList);

                await _dbRepo.SaveChangeAsync(cancellationToken);

                return newList.Id;
            }
        }
    }
}