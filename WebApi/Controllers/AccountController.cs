using Deliverr.BusinessLayer.AppServices;
using Exit_Test_WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exit_Test_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountServices _accountServices;
        public AccountController(IAccountServices accountServices)
        {
            _accountServices = accountServices;
        }

        [HttpPost("register")]
        public async Task<IActionResult> SignUp([FromBody] SignUpUserModel userModel)
        {
            //if (userModel == null) { }
            var errorDescp ="";
            if(ModelState.IsValid)
            {
                var result = await _accountServices.CreateUserAsync(userModel);

                if(result.Succeeded) 
                {
                    //ModelState.Clear();
                    return Ok(new
                        { message = "Registration Successful"}
                    );   
                }
                else
                {
                    foreach(var errorMessage in result.Errors) 
                    {
                        ModelState.AddModelError(" ", errorMessage.Description);
                        errorDescp = errorMessage.Description ;

                    }
                    return BadRequest(new
                        { message = errorDescp }
                    );
                }

            }
            return BadRequest(new
                 { error = "User Already Exists" }            
            );
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserModel signInModel)
        {
            var result = await _accountServices.LoginAsync(signInModel);
            

            if (string.IsNullOrEmpty(result) )
            {
                return Unauthorized(
                    new
                    {
                        error = "Invalid Credentials"
                    });
            }


            return Ok(new
            {
               
                token = result,
                message = "Login Successful"
            }); ;
        }


        [Authorize]
        [HttpGet("IsAuthenticated")]
        public IActionResult IsAuthenticated()
        {
            // User is authenticated
            return Ok(new
            {
               msg = "Authenticated"
            }) ;
        }


    }
}
