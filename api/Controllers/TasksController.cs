using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

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

        // PUT /tasks/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskModel updatedTask)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            // Validation: ReviewerId != UserId
            if (updatedTask.UserId == updatedTask.ReviewerId)
                return BadRequest("Reviewer cannot be the same as the User.");

            // Validation: Check if Reviewer has 'Reviewer' role
            var reviewer = await _context.Users.FindAsync(updatedTask.ReviewerId);
            if (reviewer == null)
                return BadRequest("Reviewer not found.");

            var reviewerRoles = await _context.UserRoles
                .Where(ur => ur.UserId == reviewer.Id)
                .Select(ur => ur.RoleId)
                .ToListAsync();

            var roles = await _context.Roles
                .Where(r => reviewerRoles.Contains(r.Id))
                .Select(r => r.Name)
                .ToListAsync();

            if (!roles.Contains("Reviewer"))
                return BadRequest("Selected reviewer does not have 'Reviewer' role.");

            // Update allowed fields
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;
            task.UserId = updatedTask.UserId;
            task.ReviewerId = updatedTask.ReviewerId;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
