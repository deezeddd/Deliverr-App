using Exit_Test_WebApi.Models;
using Microsoft.AspNetCore.Identity;

namespace Deliverr.BusinessLayer.AppServices
{
    public interface IAccountServices
    {
        Task<IdentityResult> CreateUserAsync(SignUpUserModel userModel);
        Task<String> LoginAsync(LoginUserModel signInModel);

    }
}