using Deliverr.BusinessLayer.AppServices;
using Deliverr.DataAccessLayer.Repository;
using Deliverr.DataAccessLayer.Repository.Account;
using Deliverr.DataAccessLayer.Repository.Cart;
using Deliverr.DataAccessLayer.Repository.Comment;
using Deliverr.DataAccessLayer.Repository.Order;
using Exit_Test_WebApi.Context;
using Exit_Test_WebApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigurationManager configuration = builder.Configuration;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORS
builder.Services.AddCors(option =>
{
    option.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
       .AllowAnyHeader();
    });
});

//DB CONNECTION
builder.Services.AddDbContext<AppDbContext>(option => {
    option.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnectionStr"));
});

//IdentityFramework
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
               .AddJwtBearer(option =>
               {
                   option.SaveToken = true;
                   option.RequireHttpsMetadata = false;
                   option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidAudience = configuration["JWT:ValidAudience"],
                       ValidIssuer = configuration["JWT:ValidIssuer"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                   };
               });

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequiredLength = 8;
    options.Password.RequireDigit = true;
    options.Password.RequiredUniqueChars = 1;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase= false;
   

});
builder.Services.AddAuthentication("CustomCookieScheme")
    .AddCookie("CustomCookieScheme", options =>
    {
        options.Cookie.Name = "UserCookie";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = 401;
            return Task.CompletedTask;
        };
    });
//Repositories
builder.Services.AddScoped<IAccountRepository,AccountRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();


builder.Services.AddScoped<IAccountServices, AccountServices>();
builder.Services.AddScoped<IProductServices, ProductServices>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ICommentService, CommentService>();








var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors("MyPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Seed -> Adding Roles
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var roles = new[] { "Admin", "User" };
    foreach(var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));
    }
}

using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    //Admin-1
    string email = "admin@admin.com";
    string password = "Admin@123";

    string email_1 = "admin1@admin.com";
    string password_1 = "Admin1@123";

    string email_2 = "admin2@admin.com";
    string password_2 = "Admin2@123";


    if (await userManager.FindByEmailAsync(email) == null)
    {
        var admin = new ApplicationUser
        {
            UserName = email,
            Email = email,
            Name = "Admin"
        };

        var admin1 = new ApplicationUser
        {
            UserName = email_1,
            Email = email_1,
            Name = "Admin1"
        };

        var admin2 = new ApplicationUser
        {
            UserName = email_2,
            Email = email_2,
            Name = "Admin2"
        };

        //var admin2 = new ApplicationUser();
        //admin2.UserName = email_2;
        //admin2.Email = email_2;
        //admin2.Name = "Admin2";

        if (admin!=null )
        {
            await userManager.CreateAsync(admin, password);
            await userManager.AddToRoleAsync(admin, "Admin");
        }

        if (admin1 != null)
        {
            await userManager.CreateAsync(admin1, password_1);
            await userManager.AddToRoleAsync(admin1, "Admin");
        }

        if (admin2 != null)
        {
            await userManager.CreateAsync(admin2, password_2);
            await userManager.AddToRoleAsync(admin2, "Admin");
        }
    }
  
}



app.Run();
