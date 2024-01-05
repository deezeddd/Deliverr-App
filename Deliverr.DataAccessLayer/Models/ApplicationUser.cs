using Microsoft.AspNetCore.Identity;

namespace Exit_Test_WebApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
