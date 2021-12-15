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
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MoveAndGo.Controllers
{
    [Authorize]
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



        public record FollowUserBody(string nickname);

        // POST: api/Relation/FollowUser
        /*let data = { nickname: "Ageris" }
        let resp = await fetch("/api/relation/followuser", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        public async Task<ActionResult<User>> FollowUser([FromBody] FollowUserBody body)
        {
            User currentUser = await _manager.FindByNameAsync(User.Identity.Name);
            if (currentUser.IsBlocked)
            {
                return StatusCode(403, "You can\'t do this action, because you are blocked");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            User user = await _manager.FindByNameAsync(body.nickname);
            if (user.IsBlocked)
            {
                return StatusCode(403, "You can\'t do this action, this user is blocked");
            }

            if (_context.Subscriptions.Where(e => e.FollowingName == body.nickname).FirstOrDefault() != null)
            {
                return Ok("You are alredy followed on this user");
            }

            Subscription sub = new Subscription()
            {
                Id = Guid.NewGuid().ToString(),
                FollowerName = currentUser.UserName,
                FollowingName = user.UserName,
            };

            _context.Subscriptions.Add(sub);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException exp)
            {
                if (_env.IsDevelopment())
                {
                    return StatusCode(500, exp);
                }
                else
                {
                    return StatusCode(500);
                }
            }

            return Ok("You are followed");
        }
    }
}
