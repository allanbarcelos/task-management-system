namespace API.Controllers {

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    [ApiController]
    [Route("")]
    public class HomeController: ControllerBase
    {
        // http://localhost/
        [HttpGet]
        public IActionResult ApiIsWroking()
        {
            return Ok(new { Status = "Success", Message = "API is working"});
        }

        // htpp://localhost/protected
        [HttpGet("protected")]
        [Authorize(Policy = "RequireUserRole")]
        public IActionResult ProtectedEndpoint()
        {
            return Ok(new { Status = "Success", Message = "If you are logged, you can see me"});
        }

    }
}