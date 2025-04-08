namespace API.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;
    using API.Data; 

    public class TaskItemModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }

        public string UserId { get; set; }
        public string ReviewerId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public IdentityUser? User { get; set; }
        public IdentityUser? Reviewer { get; set; }
    }

    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
        public string ReviewerId { get; set; }
    }

    [ApiController]
    [Route("tasks")]
    public class TasksController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public TasksController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // POST /tasks
        [HttpPost]
        [Authorize(Policy = "RequireUserRole")]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var reviewer = await _userManager.FindByIdAsync(dto.ReviewerId);
            if (reviewer == null)
                return BadRequest(new { message = "Reviewer not found." });

            var task = new TaskItemModel
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Status = dto.Status,
                UserId = userId,
                ReviewerId = dto.ReviewerId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }
    }
}
