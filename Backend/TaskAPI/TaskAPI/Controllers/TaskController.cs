using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TaskAPI.Models;
using Task = TaskAPI.Models.Task;

namespace TaskAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly Generators _generators;
        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _generators = new Generators();
            _logger = logger;
        }

        [HttpGet]
        [Route("/Connect/{count}")]
        public IActionResult Connect(int count)
        {
            Data.Tasks = _generators.GenerateRandomTasks(count);

            return Ok();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Data.Tasks);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            if (id >= Data.Tasks.Count || id < 0)
            {
                return NotFound();
            }
            
            var response = Data.Tasks.SingleOrDefault(item => item.Id == id);
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Post(TaskDto taskDto)
        {
            var task = new Task()
            {
                Id = Data.Tasks.Count,
                Title = taskDto.Title,
                Description = taskDto.Description,
                Completed = taskDto.Completed
            };

            Data.Tasks.Add(task);
            return Accepted(task);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, TaskDto taskDto)
        {
            if (id >= Data.Tasks.Count || id < 0)
            {
                return NotFound();
            }

            var task = new Task()
            {
                Id = id,
                Title = taskDto.Title,
                Description = taskDto.Description,
                Completed = taskDto.Completed
            };

            Data.Tasks[id] = task;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id >= Data.Tasks.Count || id < 0)
            {
                return NotFound();
            }

            var task = Data.Tasks.SingleOrDefault(item => item.Id == id);
            if (task != null)
            {
                Data.Tasks.Remove(task);
                return Ok();
            } else
            {
                return NotFound();
            }
        }
    }
}