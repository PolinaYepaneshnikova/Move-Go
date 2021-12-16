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
    public class FavoritesController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly SignInManager<User> _signInManager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoDbContext _context;
        public FavoritesController
            (UserManager<User> userMgr, SignInManager<User> signinMgr, IWebHostEnvironment env, MoveAndGoDbContext context)
        {
            _manager = userMgr;
            _signInManager = signinMgr;
            _env = env;
            _context = context;
        }



        public record FavoriteBody(string Id);

        // POST: api/Favorites/AddArticle
        /*let data = { id: "0b70bf15-c5c6-42b4-b4b0-fcf3951100bd" }
        let resp = await fetch("/api/favorites/addarticle", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        public async Task<ActionResult<User>> AddArticle([FromBody] FavoriteBody body)
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

            if (_context.FavoriteArticles
                .Where(e => e.FollowerName == currentUser.UserName && e.FollowingId == body.Id).FirstOrDefault() != null)
            {
                return Ok("This article is alredy added to your favorites");
            }
            
            Article article = await _context.Articles.FindAsync(body.Id);

            FavoriteArticle fav = new FavoriteArticle()
            {
                Id = Guid.NewGuid().ToString(),
                FollowerName = currentUser.UserName,
                FollowingId = article.Id,
            };

            _context.FavoriteArticles.Add(fav);

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

            return Ok("This article is added to your favorites");
        }

        // POST: api/Favorites/AddWorkout
        /*let data = { id: "0b70bf15-c5c6-42b4-b4b0-fcf3951100bd" }
        let resp = await fetch("/api/favorites/addworkout", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        public async Task<ActionResult<User>> AddWorkout([FromBody] FavoriteBody body)
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

            if (_context.FavoriteWorkouts
                .Where(e => e.FollowerName == currentUser.UserName && e.FollowingId == body.Id).FirstOrDefault() != null)
            {
                return Ok("This workout is alredy added to your favorites");
            }

            Workout workout = await _context.Workouts.FindAsync(body.Id);

            FavoriteWorkout fav = new FavoriteWorkout()
            {
                Id = Guid.NewGuid().ToString(),
                FollowerName = currentUser.UserName,
                FollowingId = workout.Id,
            };

            _context.FavoriteWorkouts.Add(fav);

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

            return Ok("This workout is added to your favorites");
        }





        // GET: api/Favorites/GetArticles/Ageris
        [HttpGet("{nickname}")]
        public async Task<ActionResult> GetArticles(string nickname)
        {
            User user = await _manager.FindByNameAsync(nickname);

            return Ok(_context.FavoriteArticles
                .Where(e => e.FollowerName == user.UserName)
                .Select(e => _context.Articles.Find(e.Id)));
        }

        // GET: api/Favorites/GetWorkout/Ageris
        [HttpGet("{nickname}")]
        public async Task<ActionResult> GetWorkout(string nickname)
        {
            User user = await _manager.FindByNameAsync(nickname);

            return Ok(_context.FavoriteWorkouts
                .Where(e => e.FollowerName == user.UserName)
                .Select(e => _context.Workouts.Find(e.Id)));
        }





        // POST: api/Favorites/RemoveArticle
        /*let data = { id: "0b70bf15-c5c6-42b4-b4b0-fcf3951100bd" }
        let resp = await fetch("/api/favorites/removearticle", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        public async Task<ActionResult<User>> RemoveArticle([FromBody] FavoriteBody body)
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

            FavoriteArticle fav = _context.FavoriteArticles
                .Where(e => e.FollowerName == currentUser.UserName && e.FollowingId == body.Id).FirstOrDefault();

            _context.FavoriteArticles.Remove(fav);

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

            return Ok("This article is removed from your favorites");
        }

        // POST: api/Favorites/RemoveWorkout
        /*let data = { id: "0b70bf15-c5c6-42b4-b4b0-fcf3951100bd" }
        let resp = await fetch("/api/favorites/removeworkout", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        public async Task<ActionResult<User>> RemoveWorkout([FromBody] FavoriteBody body)
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

            FavoriteWorkout fav = _context.FavoriteWorkouts
                .Where(e => e.FollowerName == currentUser.UserName && e.FollowingId == body.Id).FirstOrDefault();

            _context.FavoriteWorkouts.Remove(fav);

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

            return Ok("This workout is removed from your favorites");
        }
    }
}
