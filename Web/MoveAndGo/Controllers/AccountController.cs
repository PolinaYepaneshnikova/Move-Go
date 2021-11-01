using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

using System.Collections.Generic;
using System.Threading.Tasks;

using MoveAndGo.Models;
using MoveAndGo.Models.ViewModels;

namespace MoveAndGo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly SignInManager<User> _signInManager;
        private readonly IWebHostEnvironment _env;
        public AccountController(UserManager<User> userMgr, SignInManager<User> signinMgr, IWebHostEnvironment env)
        {
            _manager = userMgr;
            _signInManager = signinMgr;
            _env = env;
        }

        /*let data = { email: "serhii.cherevan@nure.ua", fullname: "Sergey Cherevan", nickname: "Ageris", password: "12345", confirmpassword: "12345" }
        let resp = await fetch("/api/account/registration", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Registration(RegistrationViewModel model)
        {
            /*if (User.Identity.IsAuthenticated)
            {
                return StatusCode(403, "You are not anonymous");
            }*/
            
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    Email = model.Email,
                    FullName = model.FullName,
                    UserName = model.Nickname,
                };

                var result = await _manager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    // установка куки
                    await _signInManager.SignInAsync(user, false);

                    return Ok(user);
                }
                else
                {
                    if (_env.IsDevelopment())
                    { 
                        return StatusCode(500, result.Errors);
                    }
                    else
                    {
                        return StatusCode(500);
                    }
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
            
        }

        /*let data = { nickname: "Ageris", password: "12345" }
        let resp = await fetch("/api/account/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            /*if (User.Identity.IsAuthenticated)
            {
                return StatusCode(403, "You are not anonymous");
            }*/

            if (ModelState.IsValid)
            {
                User user = await _manager.FindByNameAsync(model.Nickname);
                if (user != null)
                {
                    await _signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result
                        = await _signInManager.PasswordSignInAsync(model.Nickname, model.Password, false, false);

                    if (result.Succeeded)
                    {
                        user.PasswordHash = null;
                        return Ok(user);
                    }
                }

                return BadRequest("Wrong login or password");
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        /*let resp = await fetch("/api/account/logout", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        } )*/
        //await resp.text()
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok("You are logged out");
        }

        public IActionResult CurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            return new ObjectResult(User.Identity);
        }
    }
}
