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
    public class SearchController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly IWebHostEnvironment _env;
        private readonly MoveAndGoDbContext _context;
        public SearchController
            (UserManager<User> userMgr, IWebHostEnvironment env, MoveAndGoDbContext context)
        {
            _manager = userMgr;
            _env = env;
            _context = context;
        }

        // GET: api/Search/Workouts?KeyWords=Шо Турникмен&Type=Workout&Level=Hard
        /*let url = '/api/Search/Workouts';
        let params = { keyWords : 'Шо Турникмен', type : 'Workout', level : 'Hard' };
        
        let resp = await fetch(url + '?' + new URLSearchParams(params));*/
        //await resp.json()
        [HttpGet]
        public ActionResult<IEnumerable<Workout>> Workouts([FromHeader] SearchViewModel model)
        {
            string keywordSearchTerm =
                model.KeyWords != null && model.KeyWords != "" ?
                    "WHERE " + String.Join(" AND ", model.KeyWords.Split(" ").Select(e => 
                    $"(    LOWER([Text]) LIKE LOWER(\"%{e}%\")    OR    LOWER([Title]) LIKE LOWER(\"%{e}%\")    )"))
                :
                    ""
            ;


            IEnumerable<Workout> workouts = _context.Workouts
                .FromSqlRaw($"SELECT * FROM [Workouts] {keywordSearchTerm}")
                .Where(e => model.Type != null && model.Type != "" ? e.TypeId == model.Type : true)
                .Where(e => model.Level != null && model.Level != "" ?
                    e.Intensity == Workout.Intensities.IndexOf(model.Level)
                    : true)
                ;

            return new ObjectResult(workouts);
        }

        // GET: api/Search/Users?KeyWords=Сергей
        /*let url = '/api/Search/Users';
        let params = { keyWords : 'Sergey' };
        
        let resp = await fetch(url + '?' + new URLSearchParams(params));*/
        //await resp.json()
        [HttpGet]
        public ActionResult<IEnumerable<User>> Users([FromHeader] SearchViewModel model)
        {
            Console.WriteLine("model.KeyWords: " + model.KeyWords);

            string keywordSearchTerm =
                model.KeyWords != null && model.KeyWords != "" ?
                    "WHERE " + String.Join(" AND ", model.KeyWords.Split(" ").Select(e =>
                    "(    " +

                    $"LOWER([UserName]) LIKE LOWER(\"%{e}%\")" +
                    "    OR    " +
                    $"LOWER([FullName]) LIKE LOWER(\"%{e}%\")" +
                    "    OR    " +
                    $"LOWER([Email]) LIKE LOWER(\"%{e}%\")" +
                    "    OR    " +
                    $"LOWER([PhoneNumber]) LIKE LOWER(\"%{e}%\")" +

                    "    )"))
                :
                    ""
            ;


            IEnumerable<User> users = _context.Users
                .FromSqlRaw($"SELECT * FROM [AspNetUsers] {keywordSearchTerm}");

            return new ObjectResult(users);
        }
    }
}
