using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

using System.Collections.Generic;
using System.Threading.Tasks;

using MoveAndGo.Models;
using MoveAndGo.Models.ViewModels;
using System.IO;
using System;

namespace MoveAndGo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly SignInManager<User> _signInManager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoContext _context;
        public AccountController
            (UserManager<User> userMgr, SignInManager<User> signinMgr, IWebHostEnvironment env, MoveAndGoContext context)
        {
            _manager = userMgr;
            _signInManager = signinMgr;
            _env = env;
            _context = context;
        }



        private readonly string avatarRoute = "/api/media/avatar/";

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

                    user.PasswordHash = null;
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

            return BadRequest(ModelState);
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

            return BadRequest(ModelState);
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

        public async Task<IActionResult> CurrentUser()
        {
            if (User?.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();
            }

            User user = await _manager.FindByNameAsync(User.Identity.Name);
            user.Avatar = user.Avatar == null ? null : avatarRoute + user.Avatar;
            user.PasswordHash = null;

            return Ok(user);
        }

        [Authorize]
        [HttpGet("{nickname}")]
        public async Task<IActionResult> GetUser(string nickname)
        {
            User user = await _manager.FindByNameAsync(nickname);
            user.Avatar = user.Avatar == null ? null : avatarRoute + user.Avatar;
            user.PasswordHash = null;

            return Ok(user);
        }

        /* Если убрать аттрибут [FromForm], то вылезет ошибка 415 unsupported media type */
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileViewModel model)
        {
            IdentityResult result;
            User user = await _manager.GetUserAsync(HttpContext.User);

            if (ModelState.IsValid)
            {
                bool isPasswordRight = await _manager.CheckPasswordAsync(user, model.OldPassword);

                if (!isPasswordRight)
                {
                    ModelState.AddModelError(nameof(EditProfileViewModel.OldPassword), "Uncorrect");

                    return BadRequest(ModelState);
                }




                if (model.NewPassword != null)
                {

                    var _passwordValidator =
                        HttpContext.RequestServices.GetService(typeof(IPasswordValidator<User>)) as IPasswordValidator<User>;
                    var _passwordHasher =
                        HttpContext.RequestServices.GetService(typeof(IPasswordHasher<User>)) as IPasswordHasher<User>;

                    result =
                        await _passwordValidator.ValidateAsync(_manager, user, model.NewPassword);

                    if (result.Succeeded)
                    {
                        user.PasswordHash = _passwordHasher.HashPassword(user, model.NewPassword);
                        await _manager.UpdateAsync(user);
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                    }
                }

                user.FullName = model.FullName;
                user.Biographi = model.Bio;
                user.Email = model.Email;
                user.PhoneNumber = model.PhoneNumber;

                result = await _manager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }




                if (model.Avatar != null)
                {
                    try
                    {
                        try
                        {
                            string old_path = Path.Combine(_env.ContentRootPath, "ResourceFiles/Avatars/" + user.Avatar);

                            System.IO.File.Delete(old_path);
                        }
                        catch { }

                        string type = model.Avatar.ContentType;
                        string file_name = User.Identity.Name + "." + type[(type.IndexOf('/') + 1)..];

                        string file_path = Path.Combine(_env.ContentRootPath, "ResourceFiles/Avatars/" + file_name);

                        using (var fileStream = new FileStream(file_path, FileMode.Create))
                        {
                            await model.Avatar.CopyToAsync(fileStream);
                        }


                        user.Avatar = file_name;

                        result = await _manager.UpdateAsync(user);

                        if (!result.Succeeded) throw new ApplicationException("Failed to load avatar");
                    }
                    catch
                    {
                        ModelState.AddModelError(nameof(EditProfileViewModel.Avatar), "Failed to load avatar");
                    }
                }
            }

            return Redirect("/");
        }
    }
}
