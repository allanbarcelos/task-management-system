using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("/[controller]")] // /tasks
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks(
            [FromQuery] string sortBy = "CreationDate", // Default to sorting by CreationDate
            [FromQuery] string sortOrder = "asc" // Default to ascending order
        )
        {
            var query = _context.Tasks.AsQueryable();

            // Apply sorting
            query = ApplySorting(query, sortBy, sortOrder);

            var tasks = await query.ToListAsync();
            return Ok(tasks);
        }

        // GET: /tasks/reviewer
        [HttpGet("reviewer")]
        public async Task<IActionResult> GetReviewerTasks(
            [FromQuery] string sortBy = "CreationDate", // Default to sorting by CreationDate
            [FromQuery] string sortOrder = "asc" // Default to ascending order
        )
        {
            var query = _context.Tasks.AsQueryable();

            // Apply sorting
            query = ApplySorting(query, sortBy, sortOrder);

            var tasks = await query.ToListAsync();
            return Ok(tasks);
        }

        // Helper method to apply sorting
        private IQueryable<Task> ApplySorting(IQueryable<Task> query, string sortBy, string sortOrder)
        {
            // Determine the sort order
            var isAscending = string.Equals(sortOrder, "asc", StringComparison.OrdinalIgnoreCase);

            switch (sortBy.ToLower())
            {
                case "duedate":
                    query = isAscending ? query.OrderBy(t => t.DueDate) : query.OrderByDescending(t => t.DueDate);
                    break;
                case "status":
                    query = isAscending ? query.OrderBy(t => t.Status) : query.OrderByDescending(t => t.Status);
                    break;
                case "creationdate":
                default:
                    query = isAscending ? query.OrderBy(t => t.CreationDate) : query.OrderByDescending(t => t.CreationDate);
                    break;
            }

            return query;
        }
    }
}