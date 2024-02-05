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
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskCommand command)
        {
            var taskId = await _mediator.Send(command);

            return Ok(taskId);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateTask([FromBody] UpdateTaskCommand command)
        {
            var taskId = await _mediator.Send(command);

            return Ok(taskId);
        }
    }
}
