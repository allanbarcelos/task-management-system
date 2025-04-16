using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;

namespace FP_task_management_system.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
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
                                          .Where(t => t.UserId == userIdClaim.Value)
                                          .ToListAsync();

            return Ok(userTasks);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetTasks([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            var query = _context.Tasks
                .Where(t => t.UserId == userIdClaim.Value)
                .OrderByDescending(t => t.CreatedAt);

            var totalTasks = await query.CountAsync();
            var tasks = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                tasks,
                currentPage = page,
                pageSize,
                totalTasks,
                totalPages = (int)Math.Ceiling(totalTasks / (double)pageSize)
            });
        }

        // PUT /tasks/{id}/status
        [Authorize(Policy = "RequireReviewerRole")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] UpdateTaskStatusDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null || task.ReviewerId != currentUserId)
                return Forbid("Only the assigned reviewer can update the status of this task.");

            // Validate allowed status values
            var allowedStatuses = new[] { "Completed", "Needs Improvement", "Denied" };
            if (!allowedStatuses.Contains(dto.Status))
                return BadRequest("Invalid status value. Allowed values are: Completed, Needs Improvement, Denied.");

            task.Status = dto.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Task status updated seccessfully" });
        }
    }

    public class UpdateTaskStatusDto
    {
        public string Status { get; set; }
    }
}
