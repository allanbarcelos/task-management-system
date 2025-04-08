namespace API.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using API.Controllers; // using the task controller to have acces to TaskHistory model

    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<TaskHistory> TasksHistories { get; set; } // This is used to create the new table in the database called TasksHistories having the model TaskHistory in the TaskController
    }
}