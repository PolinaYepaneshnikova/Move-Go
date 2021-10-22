using Microsoft.AspNetCore.Identity;

namespace MoveAndGo.Models
{
    public class User : IdentityUser
    {
        public string Avatar { get; set; }
        public string Biographi { get; set; }
    }
}
