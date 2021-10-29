using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MoveAndGo.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MediaController : Controller
    {
        private readonly IWebHostEnvironment _appEnvironment;

        public MediaController(IWebHostEnvironment appEnviroment)
        {
            _appEnvironment = appEnviroment;
        }

        public IActionResult Avatar(string id)
        {
            System.Console.WriteLine(_appEnvironment.ContentRootPath + "/ResourceFiles/Avatars/" + id);

            return new PhysicalFileResult(_appEnvironment.ContentRootPath + "/ResourceFiles/Avatars/" + id, "image/jpeg");
        }

        public IActionResult Video(string id)
        {
            System.Console.WriteLine(_appEnvironment.ContentRootPath + "/ResourceFiles/Video/" + id);

            return new PhysicalFileResult(_appEnvironment.ContentRootPath + "/ResourceFiles/Video/" + id, "video/jpeg");
        }
    }
}
