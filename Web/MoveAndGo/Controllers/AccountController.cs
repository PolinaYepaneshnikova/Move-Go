using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

using MoveAndGo.Models;

namespace MoveAndGo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _manager;
        private readonly SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userMgr, SignInManager<User> signinMgr)
        {
            _manager = userMgr;
            _signInManager = signinMgr;
        }
    }
}
