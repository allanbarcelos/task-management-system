using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FP_task_management_system.Models;

namespace FP_task_management_system.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        private bool ValidateDueDate(DateTime dueDate)
        {
            return dueDate > DateTime.UtcNow;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserTasks()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            var userTasks = await _context.Tasks
                                          .Where(t => t.UserId == userId)
                                          .ToListAsync();

            return Ok(userTasks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {
            if (!ValidateDueDate(task.DueDate))
            {
                return BadRequest("Due date must be in the future.");
            }

            // ... existing code ...
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskModel task)
        {
            if (!ValidateDueDate(task.DueDate))
            {
                return BadRequest("Due date must be in the future.");
            }

            // ... existing code ...
        }
    }
}
