using MediatR;
using Microsoft.AspNetCore.Mvc;
using ToDoTime.Application.Commands.TasksLists;
using ToDoTime.Application.Queries.TasksLists;

namespace ToDoTime.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TasksListsController(ILogger<TasksListsController> logger, IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        private readonly ILogger<TasksListsController> _logger = logger;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasksLists = await _mediator.Send(new GetAllTasksListsQuery());
            return Ok(tasksLists);
        }

        [HttpGet]
        public async Task<IActionResult> GetTasksList([FromQuery] int tasksListId)
        {
            var tasksList = await _mediator.Send(new GetTasksListQuery()
            {
                TasksListId = tasksListId
            });

            return Ok(tasksList);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTasksList([FromBody] CreateTasksListCommand command)
        {
            var tasksListId = await _mediator.Send(command);

            return Ok(tasksListId);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateTasksList([FromBody] UpdateTasksListCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTasksList([FromQuery] int tasksListId)
        {
            await _mediator.Send(new DeleteTasksListCommand()
            {
                TasksListId = tasksListId
            });

            return Ok();
        }
    }
}
