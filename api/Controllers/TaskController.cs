namespace API.Controllers{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Authorization;
    using API.Data;

    //Create a TaskHistory model to record status changes and add a GET /tasks/{id}/history endpoint to view the history.

    public class TaskHistory{
        public int Id { get; set; }
        public int TaskItemId { get; set; }
        public string OldStatus { get; set; } = string.Empty;
        public string NewStatus { get; set; } = string.Empty;
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
        public string ChangedByUserId { get; set; } = string.Empty;
    }


    [ApiController]
    [Route("/[controller]")]
    public class TaskController : ControllerBase{

        private readonly ApplicationDbContext _dBContext;

        public TaskController(ApplicationDbContext dBContext){
            _dBContext = dBContext;
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