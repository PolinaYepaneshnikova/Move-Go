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
    public class RelationController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly SignInManager<User> _signInManager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoDbContext _context;
        public RelationController
            (UserManager<User> userMgr, SignInManager<User> signinMgr, IWebHostEnvironment env, MoveAndGoDbContext context)
        {
            _manager = userMgr;
            _signInManager = signinMgr;
            _env = env;
            _context = context;
        }




    }
}
