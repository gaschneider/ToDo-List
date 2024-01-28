using MediatR;
using Microsoft.AspNetCore.Mvc;
using ToDoTime.Application.Commands.TasksLists;

namespace ToDoTime.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TasksController(ILogger<TasksController> logger, IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        private readonly ILogger<TasksController> _logger = logger;

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] AddTaskCommand command)
        {
            var tasksListId = await _mediator.Send(command);

            return Ok(tasksListId);
        }
    }
}
