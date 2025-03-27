using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Policy = "RequireUserRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TasksController(
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == user.Id);

            if (task == null)
            {
                return NotFound(new { message = "Task not found or you don't have permission" });
            }

            // Opção 1: Remoção física
            _context.Tasks.Remove(task);
            
            // Opção 2: Marcar como cancelada (soft delete)
            // task.Status = "Cancelled";
            // task.UpdatedAt = DateTime.UtcNow;
            // _context.Tasks.Update(task);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Task deleted successfully", taskId = id });
        }
    }
}