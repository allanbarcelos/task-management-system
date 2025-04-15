using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FP_task_management_system.Models;

namespace FP_task_management_system.Controllers
{

    public class TaskHistory{
        public int Id { get; set; }
        public int TaskItemId { get; set; }
        public string OldStatus { get; set; } = string.Empty;
        public string NewStatus { get; set; } = string.Empty;
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
        public string ChangedByUserId { get; set; } = string.Empty;
    }

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

        [HttpGet("/{id}/history")]
        //[Authorize(Policy="RequireUserRole")]
        public async Task<IActionResult> getTaskHistory(int id){
            var result =  await _dBContext.TasksHistories.Where(t => t.TaskItemId == id).ToListAsync();
            
            if(result == null){
                return BadRequest();
            }

            if(result.Count > 0){
                return Ok(result);
            }
            else{
                return Ok(new{ message="No changes of status"});
            }

        }
    }
}
