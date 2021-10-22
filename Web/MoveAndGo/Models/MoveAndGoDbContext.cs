using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MoveAndGo.Models
{
    public class MoveAndGoContext : IdentityDbContext<User>
    {
        public MoveAndGoContext(DbContextOptions<MoveAndGoContext> options) : base(options) { }
    }
}
