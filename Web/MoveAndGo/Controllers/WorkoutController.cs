using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

using MoveAndGo.Models;
using MoveAndGo.Models.ViewModels;

namespace MoveAndGo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class WorkoutController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoDbContext _context;
        public WorkoutController
            (UserManager<User> userMgr, IWebHostEnvironment env, MoveAndGoDbContext context)
        {
            _manager = userMgr;
            _env = env;
            _context = context;
        }

        private readonly string
            avatarRoute = "/api/media/avatar/",
            videoRoute = "/api/media/video/";

        // GET: api/Workout/Get
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> Get()
        {


            return new ObjectResult((await _context.Workouts.ToListAsync()).Select(
                async e =>
                {
                    string avatar = (await _manager.FindByNameAsync(e.Author)).Avatar;

                    return new
                    {
                        e.Id,
                        e.Title,
                        e.Author,
                        AuthorAvatar = avatar == null ? null : avatarRoute + avatar,
                        Video = videoRoute + e.Video,
                        e.Text,
                        e.TypeId,
                        Intensity = Workout.Intensities[(int)e.Intensity],
                        e.Datetime,
                    };
                }
            ).Select(e => e.Result).Reverse());
        }

        // GET: api/Workout/Get1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> Get1(string id)
        {
            var workout = await _context.Workouts.FindAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            string avatar = (await _manager.FindByNameAsync(workout.Author)).Avatar;

            return new
            {
                workout.Id,
                workout.Title,
                workout.Author,
                AuthorAvatar = avatar == null ? null : avatarRoute + avatar,
                Video = videoRoute + workout.Video,
                workout.Text,
                workout.TypeId,
                Intensity = Workout.Intensities[(int)workout.Intensity],
                workout.Datetime,
            };
        }

        // GET: api/Workout/GetPostTypes
        [HttpGet]
        public async Task<ActionResult<Object>> GetPostTypes()
        {
            return new ObjectResult(await _context.PostTypes.ToListAsync());
        }

        // POST: api/Workout/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Workout>> Post([FromForm] AddWorkoutViewModel model)
        {
            //if (model.Video.ContentType != ".mp4")
            //{
            //    ModelState.AddModelError(nameof(AddWorkoutViewModel.Video), "Type of video is not .mp4");

            //    return BadRequest(ModelState);
            //}

            User user = await _manager.GetUserAsync(HttpContext.User);

            if (user.IsBlocked)
            {
                return StatusCode(403, "You can\'t do this action, because you are blocked");
            }

            string id = Guid.NewGuid().ToString();
            string fileName = id + ".mp4";
            string filePath = Path.Combine(_env.ContentRootPath, "ResourceFiles/Videos/" + fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.Video.CopyToAsync(fileStream);
            }

            if ((await _context.PostTypes.ToListAsync()).Find(e => e.Type == model.Type) == null)
            {
                _context.PostTypes.Add(new PostType() { Type = model.Type });
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
            }


            Workout workout = new Workout()
            {
                Id = id,
                Title = model.Title,
                Author = User.Identity.Name,
                Video = fileName,
                Text = model.Description,
                TypeId = model.Type,
                Intensity = Workout.Intensities.IndexOf(model.Level),
                Datetime = DateTime.Now,
            };

            _context.Workouts.Add(workout);
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

            return Redirect("/");
        }
    }
}
