using MediatR;
using Microsoft.AspNetCore.Mvc;
using ToDoTime.Application.Queries.TasksLists;
using ToDoTime.Domain.Exceptions;

namespace ToDoTime.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TasksListsController(ILogger<TasksListsController> logger, ISender mediator) : ControllerBase
    {
        private readonly ISender _mediator = mediator;

        private readonly ILogger<TasksListsController> _logger = logger;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasksLists = await _mediator.Send(new GetAllTasksListsQuery());
            return Ok(tasksLists);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int tasksListId)
        {
            try
            {
                var tasksList = await _mediator.Send(new GetTasksListQuery()
                {
                    TasksListId = tasksListId
                });

                return Ok(tasksList);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
    }
}
