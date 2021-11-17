using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MoveAndGo.Models
{
    public class MoveAndGoDbContext : IdentityDbContext<User>
    {
        public MoveAndGoDbContext(DbContextOptions<MoveAndGoDbContext> options) : base(options) { }


        public DbSet<Workout> Workouts { get; set; }
        public DbSet<PostType> PostTypes { get; set; }
        public DbSet<AdminNotification> AdminNotifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PostType>().HasData(new PostType[]
            {
                new PostType() { Type = "Workout" },
                new PostType() { Type = "Fitness" },
                new PostType() { Type = "Running" },
            });

            base.OnModelCreating(builder);

            builder.Entity<Workout>()
                .HasOne(w => w.Type)
                .WithMany(t => t.Workouts);

            builder.Entity<PostType>()
                .HasMany(t => t.Workouts)
                .WithOne(w => w.Type);
        }
    }
}
