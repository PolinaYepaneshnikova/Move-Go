using Microsoft.AspNetCore.Identity;

namespace MoveAndGo.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string Biographi { get; set; }
        public bool IsBlocked { get; set; }
}
}
