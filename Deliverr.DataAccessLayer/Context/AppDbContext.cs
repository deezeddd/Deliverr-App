using Deliverr.DataAccessLayer.Models;
using Exit_Test_WebApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Exit_Test_WebApi.Context
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { 
        
        }
        public DbSet<SignUpUserModel> SignUpUser { get; set; }
        public DbSet<ProductModel> ProductModel { get; set; }

        public DbSet<CartModel> CartModel { get; set; }

        public DbSet<OrdersModel> OrderModel { get; set; }

        public DbSet<CommentModel> CommentModel { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
            base.OnModelCreating(modelBuilder);

        }

      
    }
}
