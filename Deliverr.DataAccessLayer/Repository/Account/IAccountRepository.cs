using Exit_Test_WebApi.Models;
using Microsoft.AspNetCore.Identity;

namespace Deliverr.DataAccessLayer.Repository.Account
{
    public interface IAccountRepository
    {
        Task<IdentityResult> CreateUserAsync(SignUpUserModel userModel);
        Task<string> LoginAsync(LoginUserModel signInModel);


    }
}