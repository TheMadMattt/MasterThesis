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
            var response = Data.Tasks.SingleOrDefault(item => item.Id == id);
            if (response == null)
            {
                return NotFound();
            }

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
            var index = Data.Tasks.FindIndex(item => item.Id == id);
            if (index == -1)
            {
                NotFound();
            }

            var task = new Task()
            {
                Id = id,
                Title = taskDto.Title,
                Description = taskDto.Description,
                Completed = taskDto.Completed
            };

            
            Data.Tasks[index] = task;
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = Data.Tasks.SingleOrDefault(item => item.Id == id);
            if (task == null) return NotFound();
            Data.Tasks.Remove(task);
            return Ok();

        }
    }
}