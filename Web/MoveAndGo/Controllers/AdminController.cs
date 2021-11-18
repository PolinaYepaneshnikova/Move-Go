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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _manager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoDbContext _context;
        public AdminController
            (UserManager<User> userMgr, IWebHostEnvironment env, MoveAndGoDbContext context)
        {
            _manager = userMgr;
            _env = env;
            _context = context;
        }

        // GET: api/Admin/AdminNotifications
        /*let resp = await fetch("/api/admin/getadminnotifications", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        } )*/
        //await resp.json()
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminNotification>>> GetAdminNotifications()
        {
            if (User.Identity.Name != "admin")
            {
                return StatusCode(403, "You are not admin");
            }

            return new ObjectResult((await _context.AdminNotifications.ToListAsync()).Select(e => e).Reverse());
        }

        // POST: api/Admin/Complain
        /*let data = { itemLink: "/workout/0b70bf15-c5c6-42b4-b4b0-fcf3951100bd", text: "bad words" }
        let resp = await fetch("/api/admin/complain", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //await resp.json()
        [HttpPost]
        public async Task<ActionResult<AdminNotification>> Complain(AdminNotification notification)
        {
            if (ModelState.IsValid)
            {
                string lowerLink = notification.ItemLink.ToLower();

                if (!(lowerLink.StartsWith("/workout/") || lowerLink.StartsWith("/article/")))
                {
                    ModelState.AddModelError(nameof(notification.ItemLink), "link is not began by \"/workout/\" or \"/article/\"");

                    return BadRequest(ModelState);
                }

                notification.Id = Guid.NewGuid().ToString();

                _context.AdminNotifications.Add(notification);
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

                return Ok(notification);
            }

            return BadRequest(ModelState);
        }

        public record DeleteBody(string link);

        // DELETE: api/Admin/Delete
        /*let data = { link: "/workout/c54b66e1-eba0-4942-b77b-5754c472c969" }
        let resp = await fetch("/api/admin/delete", {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        } )*/
        //resp.ok
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteBody body)
        {
            if (User.Identity.Name != "admin")
            {
                return StatusCode(403, "You are not admin");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string link = body.link,
                   lowerLink = link.ToLower(),
                   id = link.Substring(link.LastIndexOf("/") + 1);


            if (lowerLink.StartsWith("/workout/"))
            {
                var workout = await _context.Workouts.FindAsync(id);
                if (workout == null)
                {
                    return NotFound();
                }

                _context.Workouts.Remove(workout);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            else if (lowerLink.StartsWith("/article/"))
            {
                //var article = await _context.Articles.FindAsync(id);
                //if (article == null)
                //{
                //    return NotFound();
                //}

                //_context.Articles.Remove(article);
                //await _context.SaveChangesAsync();

                return NoContent();
            }
            else
            {
                ModelState.AddModelError(nameof(link), "link is not began by \"/workout/\" or \"/article/\"");

                return BadRequest(ModelState);
            }
        }
    }
}
