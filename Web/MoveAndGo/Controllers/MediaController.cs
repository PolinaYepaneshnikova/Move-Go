using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

using System.IO;

namespace MoveAndGo.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MediaController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public MediaController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet("{id}")]
        public IActionResult Avatar(string id)
        {
            string file_path = Path.Combine(_env.ContentRootPath, "ResourceFiles/Avatars/" + id);
            
            string file_type = "application/" + id.Substring(id.LastIndexOf(".") + 1);
            
            string file_name = id;

            return PhysicalFile(file_path, file_type, file_name);
        }

        [HttpGet("{id}")]
        public IActionResult Video(string id)
        {
            string file_path = Path.Combine(_env.ContentRootPath, "ResourceFiles/Videos/" + id);

            string file_type = "application/" + id.Substring(id.LastIndexOf(".") + 1);

            string file_name = id;

            return PhysicalFile(file_path, file_type, file_name);
        }
    }
}
