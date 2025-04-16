using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FP_task_management_system.Models;
using System;

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

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Reviewer")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] StatusUpdateRequest request)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            var allowedStatuses = new[] { "Pending", "In Progress", "Completed" };
            if (!allowedStatuses.Contains(request.Status))
            {
                return BadRequest(new { message = "Invalid status value" });
            }

            task.Status = request.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Status updated successfully", task });
        }

        // ✅ Reviewer Task Filter
        [HttpGet("reviewer")]
        [Authorize(Roles = "Reviewer")]
        public async Task<IActionResult> GetReviewerTasks()
        {
            var reviewerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (reviewerIdClaim == null || !int.TryParse(reviewerIdClaim.Value, out int reviewerId))
            {
                return Unauthorized();
            }

            var tasksToReview = await _context.Tasks
                                              .Where(t => t.ReviewerId == reviewerId)
                                              .ToListAsync();

            return Ok(tasksToReview);
        }

        // ✅ Inline model class for status update request
        public class StatusUpdateRequest
        {
            public string Status { get; set; } = string.Empty;
        }
    }
}
