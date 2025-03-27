using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using API.Data;

// Builder
var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin() // Permite todas as origens (em desenvolvimento)
                   .AllowAnyMethod() // Permite todos os métodos HTTP
                   .AllowAnyHeader(); // Permite todos os cabeçalhos
        });
});
//

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection"); // string

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(
    options => {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        // options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }
)
.AddJwtBearer(
    options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    }
);

builder.Services.AddAuthorization(
    options => 
    {
        options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
        options.AddPolicy("RequireUserRole", policy => policy.RequireRole("User"));
        options.AddPolicy("RequireDeveloperRole", policy => policy.RequireRole("Developer"));
    }
);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Easy Way to do the API documentation 
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// stage 2
var app = builder.Build();

// CORS only in development mode
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAllOrigins");
}

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    if(!(await roleManager.RoleExistsAsync("User"))){
        await roleManager.CreateAsync(new IdentityRole("User"));
    }

    if(!(await roleManager.RoleExistsAsync("Admin"))){
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }

    if(!(await roleManager.RoleExistsAsync("Developer"))){
        await roleManager.CreateAsync(new IdentityRole("Developer"));
    }
}


if(app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
}

// if not in Development or is in Production
if(!app.Environment.IsDevelopment()){
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();