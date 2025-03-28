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

        // GET: /tasks?startDate=2023-01-01&endDate=2023-01-31
        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var query = _context.Tasks.AsQueryable();

            if (startDate.HasValue && endDate.HasValue)
            {
                query = query.Where(t => t.DueDate >= startDate.Value && t.DueDate <= endDate.Value);
            }

            var tasks = await query.ToListAsync();
            return Ok(tasks);
        }
    }
}
