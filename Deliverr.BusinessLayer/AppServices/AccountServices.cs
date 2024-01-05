using Deliverr.DataAccessLayer.Repository.Account;
using Exit_Test_WebApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.BusinessLayer.AppServices
{
    public class AccountServices : IAccountServices
    {
        private readonly IAccountRepository _accountRepository;
        public AccountServices(IAccountRepository accountRepository) 
        { 
            _accountRepository = accountRepository;
        }

        public async Task<IdentityResult> CreateUserAsync(SignUpUserModel userModel)
        {
           return await _accountRepository.CreateUserAsync(userModel);    
        }

        public async Task<String> LoginAsync(LoginUserModel signInModel)
        {
            return await _accountRepository.LoginAsync(signInModel);
        }
      
    }
}
