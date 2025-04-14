using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Helpers; // For EmailService
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PUT: /tasks/update-status/{id}
        [HttpPut("update-status/{id}")]
        [Authorize(Roles = "Reviewer")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] TaskStatusUpdateDto request)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound("Task not found.");

            var allowedStatuses = new[] { "Completed", "Needs Improvement", "Denied" };

            if (!allowedStatuses.Contains(request.Status))
                return BadRequest("Invalid status. Only 'Completed', 'Needs Improvement', or 'Denied' are allowed.");

            task.Status = request.Status;
            await _context.SaveChangesAsync();

            // Notify task owner
            var user = await _context.Users.FindAsync(task.UserId);
            if (user != null && !string.IsNullOrEmpty(user.Email))
            {
                var emailService = new EmailService();
                string subject = "Task Status Updated";
                string body = $"Hello {user.Name},\n\nYour task (ID: {task.Id}) has been updated to: {request.Status}.\n\nRegards,\nTask Management System";

                try
                {
                    emailService.SendEmail(user.Email, subject, body);
                }
                catch (Exception ex)
                {
                    // Email failure shouldn't block notification
                }

                // Add in-app notification
                var notification = new Notification
                {
                    UserId = user.Id,
                    Message = $"Your task #{task.Id} has been marked as '{task.Status}'.",
                    IsRead = false,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Status updated, user notified via email and in-app notification." });
        }
    }

    // DTO for status update
    public class TaskStatusUpdateDto
    {
        public string Status { get; set; }
    }
}