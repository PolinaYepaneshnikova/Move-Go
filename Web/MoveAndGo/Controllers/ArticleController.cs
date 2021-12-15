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
    public class ArticleController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoDbContext _context;
        public ArticleController
            (UserManager<User> userMgr, IWebHostEnvironment env, MoveAndGoDbContext context)
        {
            _manager = userMgr;
            _env = env;
            _context = context;
        }

        private readonly string
            avatarRoute = "/api/media/avatar/",
            imageRoute = "/api/media/image/";

        // GET: api/Article/Get
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> Get()
        {


            return new ObjectResult((await _context.Articles.ToListAsync()).Select(
                async e =>
                {
                    string avatar = (await _manager.FindByNameAsync(e.Author)).Avatar;

                    return new
                    {
                        e.Id,
                        e.Title,
                        e.Author,
                        AuthorAvatar = avatar == null ? null : avatarRoute + avatar,
                        Image = imageRoute + e.Image,
                        e.Text,
                        e.TypeId,
                        e.Datetime,
                    };
                }
            ).Select(e => e.Result).Reverse());
        }

        // GET: api/Article/Get1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> Get1(string id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            string avatar = (await _manager.FindByNameAsync(article.Author)).Avatar;

            return new
            {
                article.Id,
                article.Title,
                article.Author,
                AuthorAvatar = avatar == null ? null : avatarRoute + avatar,
                Image = imageRoute + article.Image,
                article.Text,
                article.TypeId,
                article.Datetime,
            };
        }

        // GET: api/Article/GetPostTypes
        [HttpGet]
        public async Task<ActionResult<Object>> GetPostTypes()
        {
            return new ObjectResult(await _context.PostTypes.ToListAsync());
        }

        // POST: api/Article/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Article>> Post([FromForm] AddArticleViewModel model)
        {
            //if (model.Image.ContentType != ".mp4")
            //{
            //    ModelState.AddModelError(nameof(AddArticleViewModel.Image), "Type of video is not .mp4");

            //    return BadRequest(ModelState);
            //}

            User user = await _manager.GetUserAsync(HttpContext.User);

            if (user.IsBlocked)
            {
                return StatusCode(403, "You can\'t do this action, because you are blocked");
            }

            string id = Guid.NewGuid().ToString();
            string fileName = id + ".mp4";
            string filePath = Path.Combine(_env.ContentRootPath, "ResourceFiles/Images/" + fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.Image.CopyToAsync(fileStream);
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


            Article article = new Article()
            {
                Id = id,
                Title = model.Title,
                Author = User.Identity.Name,
                Image = fileName,
                Text = model.Text,
                TypeId = model.Type,
                Datetime = DateTime.Now,
            };

            _context.Articles.Add(article);
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
